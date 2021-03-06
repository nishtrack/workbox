/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

const joi = require('joi');

// Define some common constrains used by all methods.
module.exports = joi.object().keys({
  dontCacheBustUrlsMatching: joi.object().type(RegExp),
  globIgnores: joi.array().items(joi.string()).default([
    'node_modules/**/*',
  ]),
  globPatterns: joi.array().items(joi.string()).default([
    '**/*.{js,css,html}',
  ]),
  manifestTransforms: joi.array().items(joi.func().arity(1)),
  maximumFileSizeToCacheInBytes: joi.number().min(1).default(2 * 1024 * 1024),
  modifyUrlPrefix: joi.object(),
  // templatedUrls is an object where any property name is valid, and the values
  // can be either a string or an array of strings.
  templatedUrls: joi.object().pattern(/./,
    [joi.string(), joi.array().items(joi.string())]),
});
