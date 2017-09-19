const vision = require('@google-cloud/vision')()

const pic = process.argv[2]

const path = './public/assets/img/' + pic

function faceDetection(inputFile, callback) {

    const request = {
        source: {
            filename: inputFile
        }
    };

    vision.faceDetection(request)
        .then((results) => {
            const faces = results[0].faceAnnotations;
            var numFaces = faces.length;

            if (numFaces)
                console.log('La imagen es un rostro, puedes continuar :)')
            else
                console.error('La imagen que subiste no es un rostro, intentalo de nuevo')
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });

}

function isLogotipo(inputFile) {


    Promise.all([

            logoDetection(inputFile),

            labelDetection(inputFile)

        ]).then(response => {

            const logo = response[0][0].logoAnnotations,
                label = response[1][0].labelAnnotations

            if (logo.length && (logo[0].score * 100 > 50))
                console.log('Es un logotipo')
            else if (label.length && isContainLogo(label).length)
                console.log('Es un logotipo')
            else
                console.log('No es un logotipo')

            /*            
                        console.log('Logos')
                        console.log(JSON.stringify(logo))
                        
                        console.log('Labels')
                        console.log(JSON.stringify(label.length))
                        console.log(JSON.stringify(label))
            */
        })
        .catch(err => {
            console.log(err)
        })


}

function isContainLogo(labels) {

    return labels.filter(label => (label.description === 'logo' && label.score * 100 > 50))

}

function labelDetection(inputFile) {

    return vision.labelDetection({
            source: {
                filename: inputFile
            }
        })
        .then(results => Promise.resolve(results))
        .catch(err => Promise.reject(err))

}

function logoDetection(inputFile, callback) {

    return vision.logoDetection({
            source: {
                filename: inputFile
            }
        })
        .then(results => Promise.resolve(results))
        .catch(err => Promise.reject(err))
}


isLogotipo(path)
