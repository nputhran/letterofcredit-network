/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.acme.mynetwork.SampleTransaction} sampleTransaction
 * @transaction
 */
/*async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.acme.mynetwork.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.acme.mynetwork', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}*/

async function sentProduct(tx) {
  
    tx.document.status="Sent";
    tx.product.state = "Seller has dispatched the product. The product is in transit and buyer is awaiting to receive it.";
    
    return getAssetRegistry('org.acme.mynetwork.document.document')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.document);
        });
  
     return getAssetRegistry('org.acme.mynetwork.product.product')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.product);
        });
  
}

async function receivedProduct(tx) {
  
    tx.document.status="Sent";
    tx.product.state = "Buyer has received the product";
    tx.loc.state = "Contractual Agreement of the Letter of Credit has been satisfied from the Seller's end."

    
    return getAssetRegistry('org.acme.mynetwork.document.document')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.document);
        });
  
     return getAssetRegistry('org.acme.mynetwork.product.product')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.product);
        });

     return getAssetRegistry('org.acme.mynetwork.loc.loc')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.loc);
        });
}

async function validatedDoc(tx) {
    
    tx.document.valid = true;
    tx.document.state = "Documents have been validated.";
  
        return getAssetRegistry('org.acme.mynetwork.document.document')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.document);
        });
}

async function invalidatedDoc(tx) {
    
    tx.document.valid = false;
    tx.document.state = "Documentvalidation failed";
  
        return getAssetRegistry('org.acme.mynetwork.document.document')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.document);
        });

}

async function receivedPayment(tx) {
  	
    tx.loc.state = "Buyer's Bank sent payment to the Seller via the Seller's Bank.";

    return getAssetRegistry('org.acme.mynetwork.loc.Loc')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.loc);
        });
}

async function sentPayment(tx) {
  	
    tx.loc.state = "Buyer's Bank collected payment from Buyer.";

    return getAssetRegistry('org.acme.mynetwork.loc.Loc')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.loc);
        });
}

