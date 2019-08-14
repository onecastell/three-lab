const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')

class button {
    constructor() {
        const buttonGeometry = new THREE.BoxGeometry(.2, .1, .6)
        const buttonMaterial = new THREE.MeshLambertMaterial({ color: 0xeaeaea, transparent: true })

        const button = new THREE.Mesh(buttonGeometry, buttonMaterial)
        button.position.set(-.175, .6, 1.6)

        const pauseButtonGeometry = new THREE.BoxGeometry(.2, .1, .6)
        const pauseButtonMaterial = new THREE.MeshLambertMaterial({ color: 0xeaeaea, transparent: true })
        const pauseButton = new THREE.Mesh(pauseButtonGeometry, pauseButtonMaterial)
        pauseButton.position.set(.175, .6, 1.6)

        // Bounding box for click listener capture
        const boundingBox = new THREE.Mesh(
            new THREE.BoxGeometry(.6, .1, .6),
            new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
        )
        boundingBox.position.set(0, .6, 1.6)

        const duration = 500
        const delay = 500
        const updateVertices = () => button.geometry.verticesNeedUpdate = true

        // Extract initial vertex values
        const right = button.geometry.vertices[0].z

        this.toPlayButton = () => {
            this.state = 'play'
            // Morph from pause button to play button
            const expandPlayButton = new TWEEN.Tween(button.scale)
                .to({ x: 3 }, duration / 2)
                .easing(TWEEN.Easing.Back.In)

            new TWEEN.Tween(pauseButton.position)
                .to({ x: -.175 }, duration / 2)
                .easing(TWEEN.Easing.Back.In)
                .start()
                .onComplete(() => pauseButton.material.opacity = 0)
                .chain(expandPlayButton)

            for (let v = 0, length = 3; v <= length; v++) {
                new TWEEN.Tween(button.geometry.vertices[v])
                    .to({ z: 0 }, duration)
                    .delay(delay)
                    .easing(TWEEN.Easing.Back.InOut)
                    .onUpdate(updateVertices)
                    .start()
                new TWEEN.Tween(button.position)
                    .to({ x: 0 }, duration)
                    .delay(delay)
                    .easing(TWEEN.Easing.Back.InOut)
                    .start()
            }
        }

        this.toPauseButton = () => {
            this.state = 'pause'
            for (let v = 0, length = 3; v <= length; v++) {
                new TWEEN.Tween(button.geometry.vertices[v])
                    .to({ z: v % 2 === 0 ? right : -right }, duration)
                    .delay(delay)
                    .easing(TWEEN.Easing.Back.InOut)
                    .onUpdate(updateVertices)
                    .start()
            }
            new TWEEN.Tween(button.scale)
                .to({ x: 1 }, duration)
                .delay(delay)
                .easing(TWEEN.Easing.Back.InOut)
                .start()
            new TWEEN.Tween(button.position)
                .to({ x: -.175 }, duration)
                .delay(delay)
                .easing(TWEEN.Easing.Back.InOut)
                .start()

            // Second bar reveal
            const revealSecondBar = new TWEEN.Tween(pauseButton.material)
                .to({ opacity: 1 }, duration / 2)
                .delay(delay * 2)
                .easing(TWEEN.Easing.Back.InOut)
                .start()
            new TWEEN.Tween(pauseButton.position)
                .to({ x: .175 }, duration / 2)
                .delay(delay * 2)
                .easing(TWEEN.Easing.Back.InOut)
                .start()
        }

        this.toPlayButton()

        // setTimeout(() => {
        //     this.toPauseButton()
        // }, duration * 2);

        // setTimeout(() => {
        //     this.toPlayButton()
        // }, duration * 6);

        this.group = new THREE.Group()
        this.group.add(button, pauseButton, boundingBox)
    }
}

module.exports = {
    button: button
}