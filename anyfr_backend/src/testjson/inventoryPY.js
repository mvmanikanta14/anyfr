const inventoryPY = [

  {
    "processes": [
      {
        "process_name": "Boondi Preparation",
        "input": {
          "quality": 100,  // kg of gram flour, water, oil
          "value": 2000    // cost in INR
        },
        "output": {
          "quality": 95,   // kg of boondi produced
          "value": 1900
        },
        "shortage": {
          "quality": 5,
          "value": 100
        },
        "excess": {
          "quality": 0,
          "value": 0
        }
      },
      {
        "process_name": "Ladoo Mixing & Shaping",
        "input": {
          "quality": 95,  // kg of boondi, sugar syrup, ghee
          "value": 3000
        },
        "output": {
          "quality": 90,  // kg of ladoos shaped
          "value": 3600
        },
        "shortage": {
          "quality": 5,
          "value": 200
        },
        "excess": {
          "quality": 0,
          "value": 0
        }
      },
      {
        "process_name": "Packaging",
        "input": {
          "quality": 90,
          "value": 3600
        },
        "output": {
          "quality": 92,  // extra due to overweighing or mixing
          "value": 3680
        },
        "shortage": {
          "quality": 0,
          "value": 0
        },
        "excess": {
          "quality": 2,
          "value": 80
        }
      }
    ]
  }



];

module.exports = {
  inventoryPY,
};
