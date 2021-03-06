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

const baseSchema = require('./base-schema');

// Add some constraints that apply to both generateSW and generateSWString.
module.exports = baseSchema.keys({
  cacheId: joi.string(),
  clientsClaim: joi.boolean().default(false),
  directoryIndex: joi.string(),
  ignoreUrlParametersMatching: joi.array().items(joi.object().type(RegExp)),
  navigateFallback: joi.string().default(false),
  navigateFallbackBlacklist: joi.array().items(joi.object().type(RegExp)),
  navigateFallbackWhitelist: joi.array().items(joi.object().type(RegExp)),
  runtimeCaching: joi.array().items(joi.object().keys({
    urlPattern: [joi.object().type(RegExp), joi.string()],
    handler: [joi.func(), joi.string().valid(
      'cacheFirst',
      'cacheOnly',
      'networkFirst',
      'networkOnly',
      'staleWhileRevalidate'
    )],
    options: joi.object().keys({
      cacheName: joi.string(),
      plugins: joi.array().items(joi.object()),
      cacheExpiration: joi.object().keys({
        maxEntries: joi.number().min(1),
        maxAgeSeconds: joi.number().min(1),
      }).or('maxEntries', 'maxAgeSeconds'),
      cacheableResponse: joi.object().keys({
        statuses: joi.array().items(joi.number().min(0).max(599)),
        headers: joi.object(),
      }).or('statuses', 'headers'),
    }),
  }).requiredKeys('urlPattern', 'handler')),
  skipWaiting: joi.boolean().default(false),
});
