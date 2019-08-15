const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')

class prevNextButton {
    constructor(type) {
        let reverseAnim = false
        const arrowGeometry = new THREE.BoxGeometry(.3, .1, .4)

        const arrowMaterial = new THREE.MeshLambertMaterial({ color: 0xeaeaea })

        const arrowOne = new THREE.Mesh(arrowGeometry, arrowMaterial)
        const arrowTwo = new THREE.Mesh(arrowGeometry, arrowMaterial)

        // Determine arrow direction based on button type
        let leftPos, rightPos, rotateDir
        const duration = 1000

        if (type === 'prev') {
            for (let v = 4, length = 7; v <= length; v++) {
                arrowOne.geometry.vertices[v].z = 0
            }
            arrowOne.position.set(-1, .6, 1.6)
            arrowTwo.position.set(-.8, .6, 1.6)

            this.anim = () => {
                reverseAnim = !reverseAnim
                leftPos = reverseAnim ? -.8 : -1
                rightPos = reverseAnim ? -1 : -.8
                rotateDir = reverseAnim ? -2 * Math.PI : 2 * Math.PI

                new TWEEN.Tween(arrowOne.position)
                    .to({ x: leftPos }, duration)
                    .start()
                new TWEEN.Tween(arrowOne.rotation)
                    .to({ x: rotateDir }, duration)
                    .easing(TWEEN.Easing.Back.InOut)
                    .start()

                new TWEEN.Tween(arrowTwo.position)
                    .to({ x: rightPos }, duration - 100)
                    .start()
                new TWEEN.Tween(arrowTwo.rotation)
                    .to({ x: rotateDir }, duration - 100)
                    .easing(TWEEN.Easing.Back.InOut)
                    .start()
            }

        } else if (type === 'next') {
            for (let v = 0, length = 3; v <= length; v++) {
                arrowOne.geometry.vertices[v].z = 0
            }
            arrowOne.position.set(1, .6, 1.6)
            arrowTwo.position.set(.8, .6, 1.6)

            this.anim = () => {
                reverseAnim = !reverseAnim
                leftPos = reverseAnim ? .8 : 1
                rightPos = reverseAnim ? 1 : .8
                rotateDir = reverseAnim ? -2 * Math.PI : 2 * Math.PI

                new TWEEN.Tween(arrowOne.position)
                    .to({ x: leftPos }, duration)
                    .start()
                new TWEEN.Tween(arrowOne.rotation)
                    .to({ x: rotateDir }, duration)
                    .easing(TWEEN.Easing.Back.InOut)
                    .start()

                new TWEEN.Tween(arrowTwo.position)
                    .to({ x: rightPos }, duration - 100)
                    .start()
                new TWEEN.Tween(arrowTwo.rotation)
                    .to({ x: rotateDir }, duration - 100)
                    .easing(TWEEN.Easing.Back.InOut)
                    .start()
            }
        }

        this.group = new THREE.Group()
        this.group.add(arrowOne, arrowTwo)
    }
}

module.exports = {
    prevNextButton: prevNextButton
}