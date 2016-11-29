#!/bin/bash
curl -H "Content-Type: application/json" \
-X POST \
-d '{
	"typeHousing": 1,
    "location":{
					"street":"Rua Tabelião Ferreira",
					"city": "Quixadá",
					"number": 123,
					"neighborhood":"Centro"
				},
    "value":340.00,
    "facilities":[1,2],
    "typeAd": 1,
    "image":"2.jpg",
	"describe":"Descrição para fazer" 

    }' \
http://localhost:8080/ad
