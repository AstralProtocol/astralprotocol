# `astral-protocol-core`

> TODO: description

## Usage

```
import { AstralClient } from '@astraldao/astral-protocol-core';
import stacItem from "./data/stacitem.json"

// create Astral Instance 
let astral = new AstralClient()

// create the GeoDID from a valid STAC Item
astral.createGeoDID(stacItem)

// TODO: Eventually the createGeoDID function will be like the following
const { geodidID } = astral.createGeoDID(stacItem)

// TODO: Finish the loadDocument Function
astral.loadDocument(geodidID)

```
