strengthify
===========

Combine jQuery and zxcvbn to create a password strength meter.

How to use
----------

Add following wrapper to your document - preferably nearby the 
password field.

```HTML
<div class="strengthify-wrapper"></div>
```

Add `jquery` (tested with 1.10.0), `jquery.strengthify.js` and 
`strengthify.css` to your document. 

```HTML
<script src="jquery-1.10.0.min.js"></script>
<script src="jquery.strengthify.js"></script>
<link rel="stylesheet" href="strengthify.css" type="text/css">
```

Because [zxcvbn](https://github.com/lowe/zxcvbn) is really 
heavy-weigth it will be loaded asynchronous from `zxcvbn/zxcvbn.js`,
but this can be configured with an optional parameter.

Then call `.strengthify` on the password input field.

```JavaScript
$('#password-field').strengthify()
```

That's it. Now the password strength meter will be updated on 
each keystroke.

Configuration
-------------

The path and the title of the different strength categories can
be configured with the first parameter of `.strengthify`. 

Default:

```JSON
{
  "zxcvbn": "zxcvbn/zxcvbn.js",
  "titles": [
    "Weakest",
    "Weak",
    "So-so",
    "Good",
    "Perfect"
  ]
}
```

Overwrite example:

```JavaScript
$('#password-field').strengthify({zxcvbn: 'my/path/to/zxcvbn.js'})
```

Versions
--------

<dl>
  <dt>0.1</dt>
  <dd>Initial version</dd>
</dl>



