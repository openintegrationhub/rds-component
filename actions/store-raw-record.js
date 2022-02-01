const uuid = require("uuid");

/**
 * Copyright 2022 Basaas GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const log = require("../logger");

/**
 * This method will be called from OIH platform upon receiving data
 *
 * @param {Object} msg - incoming message object that contains keys `data` and `metadata`
 */

async function storeRawDataRecord(msg) {
  try {
    const rawRecordId = uuid.v4();

    log.debug("Will store raw data: ", {
      rawRecordId,
      payload: msg.data,
    });

    this.emit("raw-record", {
      rawRecordId,
      payload: msg.data,
    });

    // add raw record id to message meta

    msg.metadata = msg.metadata || {};
    msg.metadata.rawRecordId = rawRecordId;

    // send data to message queue
    this.emit("data", msg);
  } catch (e) {
    log.error(`ERROR: ${JSON.stringify(e, undefined, 2)}`);
    throw new Error(e);
  }
}

module.exports.process = storeRawDataRecord;
