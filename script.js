let model = tf.sequential();


let setuped = false

function setup() {
    setuped = true
    document.getElementById("train").disabled = false
    model = tf.sequential();
    const hiddenLayer = tf.layers.dense({
        units: parseInt(document.getElementById("neuronsRange").value),
        inputShape: [parseInt(document.getElementById("logicInputLength").value)],
        activation: document.getElementById("activationFunctionSelector")[document.getElementById("activationFunctionSelector").selectedIndex].innerHTML.toLowerCase()
    })
    const outputLayer = tf.layers.dense({
        units: 1,
        activation: document.getElementById("activationFunctionSelector")[document.getElementById("activationFunctionSelector").selectedIndex].innerHTML.toLowerCase()
    })
    model.add(hiddenLayer);
    model.add(outputLayer);

    model.compile({
        optimizer: document.getElementById("optimizerSelector")[document.getElementById("optimizerSelector").selectedIndex].innerHTML,
        loss: tf.losses[document.getElementById("lossFunctionSelector")[document.getElementById("lossFunctionSelector").selectedIndex].innerHTML],
        metrics: ['mae']

    })
}

function startTrain() {
    document.getElementById("train").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Training...'
    let logicInputs = [
        document.getElementById("logicInput1").value.split("").map(x => {
            return parseInt(x)
        }),
        document.getElementById("logicInput2").value.split("").map(x => {
            return parseInt(x)
        }),
        document.getElementById("logicInput3").value.split("").map(x => {
            return parseInt(x)
        }),
        document.getElementById("logicInput4").value.split("").map(x => {
            return parseInt(x)
        })
    ]
    const xs = tf.tensor2d([
        logicInputs[0],
        logicInputs[1],
        logicInputs[2],
        logicInputs[3]
    ])
    const ys = tf.tensor1d([
        parseInt(document.getElementById("resultInput1").value),
        parseInt(document.getElementById("resultInput2").value),
        parseInt(document.getElementById("resultInput3").value),
        parseInt(document.getElementById("resultInput4").value)
    ])
    document.getElementById("train").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Training...'
    model.fit(xs, ys, {
        epochs: document.getElementById("epochsRange").value
    }).then(() => {
        document.getElementById("train").innerHTML = 'Start train !'
        document.getElementById("predict").disabled = false
    })

}

function startPredict() {
    let logicInput = document.getElementById("logicInputForResult").value.split("").map(x => {
        return parseInt(x)
    })
    const data = tf.tensor2d([
        logicInput
    ])
    let result = model.predict(data)
    document.getElementById("result-modal-body").innerHTML = "The neural network predicted : " + result.toString()
    $('#exampleModal').modal('show')
}