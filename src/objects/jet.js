const THREE = require('three')
class jet{
    constructor(){
        // TODO: convert to buffer geometry
        const geometry = new THREE.PlaneGeometry(.5,.5,1,1)
        geometry.vertices[1].set(.8,.8,0)
        geometry.vertices[2].set(0.25,.25,0)
        geometry.rotateX(Math.PI/2)
        geometry.rotateY(Math.PI/2)
        const material = new THREE.MeshNormalMaterial({wireframe:true})
        
        const jet = new THREE.Mesh(geometry,material)
        jet.position.set(-2,1,2)
        return jet
    }
    
}
0
module.exports =  {
   jet: new jet
}