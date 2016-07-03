/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast-util-to-html
 * @fileoverview Test suite for `hast-util-to-html`.
 */

'use strict';

/* eslint-env node */

/* Dependencies. */
var test = require('tape');
var h = require('hastscript');
var to = require('..');

/* Tests. */
['td', 'th'].forEach(function (tagName, index, values) {
  test('`' + tagName + '` (closing)', function (t) {
    var other = values[index ? 0 : 1];

    t.deepEqual(
      to(h(tagName), {omitOptionalTags: true}),
      '<' + tagName + '>',
      'should omit tag without parent'
    );

    t.deepEqual(
      to(h('tr', h(tagName)), {omitOptionalTags: true}),
      '<tr><' + tagName + '>',
      'should omit tag without following'
    );

    t.deepEqual(
      to(h('tr', [h(tagName), h(tagName)]), {omitOptionalTags: true}),
      '<tr><' + tagName + '><' + tagName + '>',
      'should omit tag followed by `' + tagName + '`'
    );

    t.deepEqual(
      to(h('tr', [h(tagName), h(other)]), {omitOptionalTags: true}),
      '<tr><' + tagName + '><' + other + '>',
      'should omit tag followed by `' + other + '`'
    );

    t.deepEqual(
      to(h('tr', [h(tagName), h('p')]), {omitOptionalTags: true}),
      '<tr><' + tagName + '></' + tagName + '><p>',
      'should not omit tag followed by others'
    );

    t.end();
  });
});
