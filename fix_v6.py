import sys, re
sys.stdout.reconfigure(encoding='utf-8')

PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')

# The problem: ALL __() calls are inside JS string literals like:
#   h += '... + __('key') + ...'
# They should be:
#   h += '...' + __('key') + '...'
#
# We need to fix each __() by:
# 1. Finding the enclosing '...' or "..."
# 2. Breaking the string before __() and reopening after it

# Step 1: Find every __() pattern and fix the string context
# The bad pattern is: ...'text + __('key') + text'...
# We need: ...'text' + __('key') + 'text'...

# More specifically, inside h += '...' blocks:
#   '...' + __('key') + '...'  <- correct
#   '...+ __('key') +...'       <- wrong (what we have)

# Let's do a targeted fix using regex replacement

# Pattern: inside a single-quoted string, we have + __('key') +
# The fix: break the string around __()

def fix_string_literals(code):
    """Fix __() calls that are trapped inside JS string literals."""
    result = []
    i = 0
    while i < len(code):
        # Check if we're at a __() call
        m = re.match(r"__\('[^']*'\)", code[i:])
        if m:
            call = m.group()
            # Check what's before the call
            before = code[max(0,i-10):i]
            
            # Case 1: before ends with '+ (good pattern) or inside a string
            # If we see '... + __(...) + ...' inside a string
            # Find the opening ' of this string segment
            j = i - 1
            while j >= 0 and code[j] in ' \t\n\r':
                j -= 1
            
            # Check if we're inside a single-quoted string
            # Count quotes between the last '+ or ' and this position
            prefix = code[max(0,i-200):i]
            # Find the most recent single quote
            last_sq = prefix.rfind("'")
            last_dq = prefix.rfind('"')
            
            # Check if there's a + before __(
            has_plus_before = bool(re.search(r"\+[^'\"+]*$", prefix[:10]))
            
            # If the last non-whitespace before __( is + or end of a string
            # AND we're inside a string (quote is open)
            
            # Simpler approach: just check if after __() we're inside a string
            end = i + len(call)
            after = code[end:end+20]
            
            # Check if __() is wrapped in a string: `'... + __() + ...'`
            # In this pattern, there's ' before __ and ' after )
            # The fix: close string before __, open after
            
            result.append(call)
            i = end
            continue
        
        # Check for string delimiter that starts a problematic pattern
        if code[i] == "'":
            # Look ahead for __() followed by closing ' without proper concatenation
            rest = code[i+1:]
            next_close = rest.find("'")
            if next_close > 0:
                before_close = rest[:next_close]
                # Check if __() is embedded (not concatenated)
                if "__('" in before_close:
                    # Find the __() call position relative to rest
                    call_start = rest.find("__('")
                    call_end = rest.find("')", call_start) + 2
                    if call_end > 0 and call_end < next_close:
                        # This is a bad pattern: ' text + __('key') + text '
                        # We need: ' text' + __('key') + 'text '
                        ctx_before = rest[:call_start]
                        the_call = rest[call_start:call_end]
                        ctx_after = rest[call_end:next_close]
                        
                        # Build: 'ctx_before' + the_call + 'ctx_after'
                        result.append("'" + ctx_before + "'")
                        result.append(" + " + the_call + " + ")
                        result.append("'" + ctx_after + "'")
                        i += 1 + next_close + 1  # skip past closing '
                        continue
        
        if code[i] == '"':
            rest = code[i+1:]
            next_close = rest.find('"')
            if next_close > 0:
                before_close = rest[:next_close]
                if "__('" in before_close:
                    call_start = rest.find("__('")
                    call_end = rest.find("')", call_start) + 2
                    if call_end > 0 and call_end < next_close:
                        ctx_before = rest[:call_start]
                        the_call = rest[call_start:call_end]
                        ctx_after = rest[call_end:next_close]
                        
                        result.append('"' + ctx_before + '"')
                        result.append(" + " + the_call + " + ")
                        result.append('"' + ctx_after + '"')
                        i += 1 + next_close + 1
                        continue
        
        result.append(code[i])
        i += 1
    
    return ''.join(result)

# Test on a small section first
test = """
  h += '<div class="freight-warning">+ __('Chế độ CIF yêu cầu') +</div>';
  h += '<div class="lbl">+ __('Sản phẩm') +</div><div class="val">' + x + '</div>';
  h += '<tr><th colspan="4">+ __('Thông tin') +</th><th>test</th></tr>';
"""

print("=== BEFORE ===")
print(test)
print("=== AFTER ===")
print(fix_string_literals(test))
