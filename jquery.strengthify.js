/**
 * Strengthify - show the weakness of a password (uses zxcvbn for this)
 * https://github.com/MorrisJobke/strengthify
 *
 * Version: 0.5.2
 * Author: Morris Jobke (github.com/MorrisJobke) - original
 *         Eve Ragins @ Eve Corp (github.com/eve-corp)
 *  
 *
 * License:
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2015 Morris Jobke <morris.jobke@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/* global jQuery */
(function ($) {
    $.fn.strengthify = function (paramOptions) {
        return this.each(function () {
            var me = $(this),
                defaults = {
                    zxcvbn: 'zxcvbn/zxcvbn.js',
                    titles: [
                        'Weakest',
                        'Weak',
                        'So-so',
                        'Good',
                        'Perfect'
                    ],
                    drawTitles: false,
                    drawMessage: false,
                    drawBars: true
                },
                options = $.extend(defaults, paramOptions),
                drawStrengthify = function () {
                    var password = $(me).val(),
                        // hide strengthify if no input is provided
                        opacity = (password === '') ? 0 : 1,
                        // calculate result
                        result = zxcvbn(password),
                        // setup some vars for later
                        css = '',
                        bsLevel = '',
                        message = '',
                        // cache jQuery selections
                        $wrapper = $('div[data-strengthifyFor="' + me.attr('id') + '"]'),
                        $container = $wrapper.find('.strengthify-container'),
                        $message = $wrapper.find('[data-strengthifyMessage]');


                    $wrapper.children()
                        .css('opacity', opacity)
                        .css('-ms-filter',
                            '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')"'
                            );

                    // style strengthify bar
                    // possible scores: 0-4
                    switch (result.score) {
                        case 0:
                        case 1:
                            css = 'password-bad';
                            bsLevel = 'danger';
                            message = result.feedback ? result.feedback.suggestions.join('<br/>') : "";
                            break;
                        case 2:
                            bsLevel = 'warning';
                            message = result.feedback ? result.feedback.suggestions.join('<br/>') : "";
                            css = 'password-medium';
                            break;
                        case 3:
                            css = 'password-good';
                            bsLevel = 'info';
                            message = "Getting better.";
                        case 4:
                            css = 'password-good';
                            bsLevel = 'success';
                            message = "Looks good.";
                            break;
                    }

                    if ($message) {
                        $message.removeAttr('class');
                        $message.addClass('bg-' + bsLevel);

                        // reset state for empty string password
                        if (password === '') {
                            message = '';
                        }
                        $message.html(message);
                    }
                    if ($container) {
                        $container
                            .attr('class', css + ' strengthify-container')
                        // possible scores: 0-4
                            .css(
                                'width',
                                // if score is '0' it will be changed to '1' to
                                // not hide strengthify if the password is extremely weak
                                ((result.score === 0 ? 1 : result.score) * 25) + '%'
                                );

                        // reset state for empty string password
                        if (password === '') {
                            $container.css('width', 0);
                        }
                    }

                    if (options.drawTitles) {
                        // set a title for the wrapper
                        $wrapper.attr(
                            'title',
                            options.titles[result.score]
                            ).tooltip({
                                placement: 'bottom',
                                trigger: 'manual',
                            }).tooltip(
                                'show'
                                );

                        if (opacity === 0) {
                            $wrapper.tooltip(
                                'hide'
                                );
                        }
                    }


                };

            // add elements
            me.after('<div class="strengthify-wrapper" data-strengthifyFor="' + me.attr('id') + '"></div>');

            if (options.drawBars) {
                $('.strengthify-wrapper')
                    .append('<div class="strengthify-bg" />')
                    .append('<div class="strengthify-container" />')
                    .append('<div class="strengthify-separator" style="left: 25%" />')
                    .append('<div class="strengthify-separator" style="left: 50%" />')
                    .append('<div class="strengthify-separator" style="left: 75%" />');
            }

            if (options.drawMessage) {
                $('.strengthify-wrapper').append('<div data-strengthifyMessage></div>');
            }

            me.parents().on('scroll', drawStrengthify);

            $.ajax({
                cache: true,
                dataType: 'script',
                url: options.zxcvbn
            }).done(function () {
                me.bind('keyup input change', drawStrengthify);
            });

            //return me;
        });
    };

}(jQuery));
