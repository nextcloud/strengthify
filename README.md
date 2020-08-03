🔒🔍 strengthify
================

Combine jQuery and zxcvbn to create a password strength meter.

![Examples](examples.png)

How to use
----------

As of 0.5.0, the wrapper will be automatically added beneath the target input field

Add `jquery` (tested with 1.10.0), `jquery.strengthify.js` and
`strengthify.css` to your document.

If using the message option, include bootstrap.

If using the titles option, include bootstrap's `tooltip.js`,

```HTML
<script src="jquery-1.10.0.min.js"></script>
<script src="tooltip.js"></script>
<script src="jquery.strengthify.js"></script>
<link rel="stylesheet" href="bootstrap.min.css" type="text/css">
<link rel="stylesheet" href="strengthify.css" type="text/css">
```

Because [zxcvbn](https://github.com/dropbox/zxcvbn) is really
heavyweight, it will be loaded asynchronously from `zxcvbn/zxcvbn.js`.
This can however be configured with an optional parameter.

Then call `.strengthify` on the password input field.

```JavaScript
$('#password-field').strengthify()
```

That's it. Now the password strength meter will be updated after
each keystroke.

Configuration
-------------

The path and the title of the different strength categories can
be configured with the first parameter of `.strengthify`.


<dl>
<dt>userInputs</dt><dd> an array of strings that zxcvbn will treat as an extra dictionary</dd>
<dt>drawTitles</dt><dd> pop-up text (above)</dd>
<dt>drawMessage</dt><dd> detailed message beneath input</dd>
<dt>drawBars</dt><dd> password strength color progression bars beneath input</dd>
<dt>$addAfter</dt><dd> element after which the strengthify element should be inserted</dd>
<dt>nonce</dt><dd> a nonce that is added to the `<script>` tag to load the zxcvbn.js file asynchronously</dd>
</dl>

Default:

```JSON
{
  "zxcvbn": "zxcvbn/zxcvbn.js",
  "userInputs": [],
  "titles": [
    "Weakest",
    "Weak",
    "So-so",
    "Good",
    "Perfect"
  ],
  "drawTitles": false,
  "drawMessage": false,
  "drawBars": true,
  "$addAfter": null
}
```
Overwrite example:

```JavaScript
$('#password-field').strengthify({zxcvbn: 'my/path/to/zxcvbn.js'})
```

Use 'onResult' callback option like:

```JavaScript
$('#password-field').strengthify({
    zxcvbn: 'my/path/to/zxcvbn.js',
    onResult: function(result) {
        var submitBtn = $('input[type=submit]');
      
        if (result.score < 3) {
          submitBtn.prop('disabled', 'disabled');
        } else {
          submitBtn.prop('disabled', false);
        }
    }
})
```

Versions
--------

<dl>
  <dt>0.5.9</dt>
  <dd>
    <ul>
      <li>Don't overdo the strength check, the first 100 chars are enough (https://github.com/morrisjobke/strengthify/pull/32)</li>
    </ul>
  </dd>
  <dt>0.5.8</dt>
  <dd>
    <ul>
      <li>wait for load of script before binding (https://github.com/morrisjobke/strengthify/pull/28)</li>
    </ul>
  </dd>
  <dt>0.5.7</dt>
  <dd>
    <ul>
      <li>add option for user input (#27)</li>
    </ul>
  </dd>
  <dt>0.5.6</dt>
  <dd>
    <ul>
      <li>set the nonce properly in all browsers (#24)</li>
    </ul>
  </dd>
  <dt>0.5.5</dt>
  <dd>
    <ul>
      <li>allow to specify a nonce for the loaded script (#23)</li>
    </ul>
  </dd>
  <dt>0.5.4</dt>
  <dd>
    <ul>
      <li>do not use `eval()` anymore (#19)</li>
    </ul>
  </dd>
  <dt>0.5.3</dt>
  <dd>
    <ul>
      <li>make possible to specify the element to add the strength bar after (#20)</li>
      <li>provide minified version (#16)</li>
    </ul>
  </dd>
  <dt>0.5.2</dt>
  <dd>
    <ul>
      <li>use eval directly (#14)</li>
      <li>added missing break (#13)</li>
    </ul>
  </dd>
  <dt>0.5.1</dt>
  <dd>add tilesOptions (#10) - you can choose now between tooltip and element or both - thanks to @feirer</dd>
  <dt>0.5.0</dt>
  <dd> fairly substantial changes:
    <ul>
        <li>added feedback message</li>
        <li> $.each(...) functionality</li>
        <li> restructuring wrapping</li>
        <li> feature flags</li>
    </ul>
     "strengthify-wrapper" added automatically beneath target input
  </dd>
  <dt>0.4.1</dt>
  <dd>hotfix for missing ;</dd>
  <dt>0.4</dt>
  <dd>syntax and performance cleanups</dd>
  <dt>0.3</dt>
  <dd>some fixes:
    <ul>
      <li>migrate from "display" to "opacity"</li>
      <li>fix pasting to input field</li>
      <li>add tipsy with strength</li>
    </ul>
  </dd>
  <dt>0.2</dt>
  <dd>solve mimetype issues</dd>
  <dt>0.1</dt>
  <dd>Initial version</dd>
</dl>
