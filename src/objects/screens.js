const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')

// Animated array of screens
class screens {
    constructor() {

        this.group = new THREE.Group()
        this.screens = new THREE.Group()

        const width = 4
        const height = 3
        const duration = 1000

        const screenGeometry = new THREE.BoxBufferGeometry(width, .1, height)

        let screenYpos = .9
        let screenIndex = 1
        // Generate array of stacked screens
        for (let i = 0; i < 4; i++) {
            const screenMaterial = new THREE.MeshLambertMaterial({ color: 0x353535, transparent: true })
            screenMaterial.opacity = 1
            const screen = new THREE.Mesh(screenGeometry, screenMaterial)
            screen.castShadow = false
            // screen.position.set(0, .6, -.5)
            screen.position.set(0, screenYpos -= .4, -.5)
            this.screens.add(screen)
        }

        // Translate all screens up
        this.next = () => {
            const magnitude = this.screens.position.y + .4
            console.log(magnitude, this.screens.children.length * .4)
            if (this.screens.position.y + .4 < this.screens.children.length * .4) {
                new TWEEN.Tween(this.screens.position)
                    .to({ y: magnitude }, 1000)
                    .delay(500)
                    .easing(TWEEN.Easing.Back.Out)
                    .start()
                new TWEEN.Tween(this.screens.children[screenIndex].material)
                    .to({ opacity: 1 }, 1000)
                    .easing(TWEEN.Easing.Back.Out)
                    .start()
                new TWEEN.Tween(this.screens.children[screenIndex - 1].material)
                    .to({ opacity: 0 }, 700)

                    .delay(500)
                    .start()
                screenIndex += 1
                console.log(screenIndex)
            }
        }

        // Translate all screens down
        this.prev = () => {
            const magnitude = this.screens.position.y
            console.log(magnitude)
            if (this.screens.position.y >=.4) {
                new TWEEN.Tween(this.screens.position)
                    .to({ y: magnitude - .4 }, 1000)
                    .delay(500)
                    .easing(TWEEN.Easing.Back.Out)
                    .start()
                new TWEEN.Tween(this.screens.children[screenIndex-2].material)
                    .to({ opacity: 1 }, 700)
                    .easing(TWEEN.Easing.Back.Out)
                    .delay(500)
                    .start()
                screenIndex -= 1
            }
        }

        // Bottom Screen
        const bottomScreenMaterial = new THREE.MeshLambertMaterial({ color: 0x353535, transparent: true })
        const bottomScreen = new THREE.Mesh(screenGeometry, bottomScreenMaterial)
        bottomScreen.material.opacity = 0
        bottomScreen.position.set(0, .1, -.5)

        // Shadow emulation plane
        const shadowGeometry = new THREE.PlaneBufferGeometry(width, height)
        const shadowMaterial = new THREE.ShadowMaterial()
        const shadowPlane = new THREE.Mesh(shadowGeometry, shadowMaterial)
        shadowPlane.receiveShadow = true
        shadowMaterial.opacity = 0
        shadowPlane.position.set(0, .26, -.5)
        shadowPlane.rotation.set(-Math.PI / 2, 0, 0)

        //     new TWEEN.Tween(shadowPlane.material)
        //     .to({ opacity: .5 }, duration)
        //     // .yoyo(true)
        //     .repeat(Infinity)
        //     .repeatDelay(1000)
        // // .start()

        // Video Overlay
        this.video = document.createElement('video')
        this.video.src = '../assets/videos/seoul.mp4#t=0'
        this.video.autoplay = false
        this.video.loop = true

        const videoGeometry = new THREE.PlaneBufferGeometry(width - .05, height - 1)
        const videoTexture = new THREE.VideoTexture(this.video);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBFormat;
        const videoMaterial = new THREE.MeshPhongMaterial({ map: videoTexture })
        const videoOverlay = new THREE.Mesh(videoGeometry, videoMaterial)
        videoOverlay.position.set(0, .66, -.5)
        videoOverlay.rotation.x = -Math.PI / 2

        // Video focus animation
        new TWEEN.Tween(videoOverlay.scale)
            .to({ y: .85 }, 2000)
            .delay(duration)
            .easing(TWEEN.Easing.Back.Out)
        // .start()

        // Start Screen Carousel Animation
        this.anim = () => {
            // Top Screen Animation
            const fade = new TWEEN.Tween(screen.material)
                .to({ opacity: 0 }, duration)
                // .yoyo(true)
                .delay(duration)
                .repeat(Infinity)
                .repeatDelay(duration)

            // Delay visiblity in first iteration
            new TWEEN.Tween(screen.material)
                .to({ opacity: 1 }, 1)
                .delay(duration)
                .start()
                .chain(fade)

            new TWEEN.Tween(screen.position)
                .to({ y: 1 }, duration)
                .easing(TWEEN.Easing.Cubic.InOut)
                .delay(duration * 2)
                .repeat(Infinity)
                .repeatDelay(duration)
                .start()

            // Second Screen Animation
            new TWEEN.Tween(bottomScreen.position)
                .to({ y: .6 }, duration)
                .easing(TWEEN.Easing.Cubic.InOut)
                .repeat(Infinity)
                .repeatDelay(duration)
                .start()
            new TWEEN.Tween(bottomScreen.material)
                .to({ opacity: 1 }, duration)
                .repeat(Infinity)
                .repeatDelay(duration)
                .start()
        }

        this.anim = () => { }

        this.group.add(this.screens)
    }
}

module.exports = {
    screens: screens
}