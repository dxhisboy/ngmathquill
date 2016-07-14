# ngmathquill
A wrapper for mathquill in AngularJS

##directives

###math-scope
The root scope containing mathquill elements.

###math-field
The element containing visible math symbols

###math-button
This element can call cmd on the math-field, having 3 attrs:

`cmd`: the cmd to call.

`latex`: latex text to be displayed on the button.

`movement`: using 'LRUD' meaning "Left", "Right", "Up", "Down", indicating the cursor movement after the cmd is called.

###latex-field
The field displaying corresponding latex text.