/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// this object is generated from Flow Builder under "..." > Endpoint > Snippets > Responses
// To navigate to a screen, return the corresponding response from the endpoint. Make sure the response is enccrypted.
const SCREEN_RESPONSES = {
    USER_DATA: {
        "screen": "USER_DATA",
        "data": {
            "document_type": [
                {
                    "id": "1",
                    "title": "V - Venezolano"
                },
                {
                    "id": "2",
                    "title": "E - Extranjero"
                },
                {
                    "id": "3",
                    "title": "J - Jur\u00eddico"
                },
                {
                    "id": "4",
                    "title": "P - Pasaporte"
                },
                {
                    "id": "5",
                    "title": "G - Gobierno"
                }
            ],
            "banks": [
                {
                    "id": "0102",
                    "title": "0102 - Banco de Venezuela, S.A. Banco Universal"
                },
                {
                    "id": "0104",
                    "title": "0104 - Venezolano de Cr\u00e9dito, S.A. Banco Universal"
                },
                {
                    "id": "0105",
                    "title": "0105 - Mercantil Banco, C.A. Banco Universal"
                },
                {
                    "id": "0108",
                    "title": "0108 - BBVA Provincial, S.A. Banco Universal"
                },
                {
                    "id": "0114",
                    "title": "0114 - Bancaribe C.A. Banco Universal"
                },
                {
                    "id": "0115",
                    "title": "0115 - Banco Exterior C.A. Banco Universal"
                },
                {
                    "id": "0128",
                    "title": "0128 - Banco Caron\u00ed C.A. Banco Universal"
                },
                {
                    "id": "0134",
                    "title": "0134 - Banesco, Banco Universal S.A.C.A."
                },
                {
                    "id": "0137",
                    "title": "0137 - Banco Sofitasa, Banco Universal"
                },
                {
                    "id": "0138",
                    "title": "0138 - Banco Plaza, Banco Universal"
                },
                {
                    "id": "0146",
                    "title": "0146 - Bangente C.A"
                },
                {
                    "id": "0151",
                    "title": "0151 - BFC Banco Fondo Com\u00fan C.A. Banco Universal"
                },
                {
                    "id": "0156",
                    "title": "0156 - 100% Banco, Banco Universal C.A."
                },
                {
                    "id": "0157",
                    "title": "0157 - DelSur Banco Universal C.A."
                },
                {
                    "id": "0163",
                    "title": "0163 - Banco del Tesoro, C.A. Banco Universal"
                },
                {
                    "id": "0166",
                    "title": "0166 - Banco Agr\u00edcola de Venezuela, C.A. Banco Universal"
                },
                {
                    "id": "0168",
                    "title": "0168 - Bancrecer, S.A. Banco Microfinanciero"
                },
                {
                    "id": "0169",
                    "title": "0169 - R4, Banco Microfinanciero, C.A."
                },
                {
                    "id": "0171",
                    "title": "0171 - Banco Activo, Banco Universal"
                },
                {
                    "id": "0172",
                    "title": "0172 - Bancamiga, Banco Universal C.A."
                },
                {
                    "id": "0173",
                    "title": "0173 - Banco Internacional de Desarrollo, C.A. Banco Universal"
                },
                {
                    "id": "0174",
                    "title": "0174 - Banplus Banco Universal, C.A"
                },
                {
                    "id": "0175",
                    "title": "0175 - Banco Digital de Los Trabajadores, Banco Universal, C.A."
                },
                {
                    "id": "0177",
                    "title": "0177 - Banco de la Fuerza Armada Nacional Bolivariana, B.U."
                },
                {
                    "id": "0178",
                    "title": "0178 - N58 Banco Digital, S.A. Banco Microfinanciero S.A."
                },
                {
                    "id": "0191",
                    "title": "0191 - Banco Nacional de Cr\u00e9dito, C.A. Banco Universal"
                }
            ]
        }
    },
    OTP_CHECK: {
        "screen": "OTP_CHECK",
        "data": {}
    },
    SUCCESS: {
        "screen": "SUCCESS",
        "data": {}
    },
    FAILURE: {
        "screen": "FAILURE",
        "data": {}
    },
    SUCCESS: {
        "screen": "SUCCESS",
        "data": {
            "extension_message_response": {
                "params": {
                    "flow_token": "REPLACE_FLOW_TOKEN",
                    "some_param_name": "PASS_CUSTOM_VALUE"
                }
            }
        }
    },
};

const documentTypeDictionary = [
    ['1', "V"],
    ['2', "E"],
    ['3', "J"],
    ['4', "P"],
    ['5', "G"]
]


export const getNextScreen = async (decryptedBody) => {
  const { screen, data, version, action, flow_token } = decryptedBody;
  // handle health check request
  if (action === "ping") {
    return {
      data: {
        status: "active",
      },
    };
  }

  // handle error notification
  if (data?.error) {
    console.warn("Received client error:", data);
    return {
      data: {
        acknowledged: true,
      },
    };
  }

  // handle initial request when opening the flow and display LOAN screen
  if (action === "INIT") {
    return {
      ...SCREEN_RESPONSES.USER_DATA,
      data: {
        ...SCREEN_RESPONSES.USER_DATA.data
      }
    };
  }

  if (action === "data_exchange") {
    // handle the request based on the current screen
    switch (screen) {
      // handles when user submits USER_DATA screen
      case "USER_DATA":
        console.log("data exchange for USER DATA:")
        const identityMap = new Map(documentTypeDictionary);
        const identityNumber = identityMap.get(data.document_type) + data.identity
        console.log("full identity: ", identityNumber)
        return {
          ...SCREEN_RESPONSES.OTP_CHECK,
          data: {
          },
        };
      case "OTP_CHECK":
        // TODO here process user selected preferences and return customised offer
        return {
          ...SCREEN_RESPONSES.OFFER,
          data: {
            // copy initial screen data then override specific fields
            ...SCREEN_RESPONSES.OFFER.data,
            offer_label: "Here are 4 shortlisted " + data.selected_product + "s",
            selected_product: data.selected_product,
          },
        };

      case "SUCCESS":
        // TODO return details of selected device
        return {
          ...SCREEN_RESPONSES.PRODUCT_DETAIL,
          data: {
            // copy initial screen data then override specific fields
            ...SCREEN_RESPONSES.PRODUCT_DETAIL.data,
            product_name: SCREEN_RESPONSES.OFFER.data.shortlisted_devices
                .filter((a) => a.id === data.device)
                .map((a) => a.title)[0],
            selected_device: data.device
            //"image_src": ""
          },
        };

      default:
        break;
    }
  }

  console.error("Unhandled request body:", decryptedBody);
  throw new Error(
    "Unhandled endpoint request. Make sure you handle the request action & screen logged above."
  );
};

