import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Sky } from 'three/addons/objects/Sky.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()
// close gui by default
gui.close()
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Floor
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/brown_mud_02_1k/brown_mud_02_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/brown_mud_02_1k/brown_mud_02_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/brown_mud_02_1k/brown_mud_02_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/brown_mud_02_1k/brown_mud_02_disp_1k.jpg')

floorColorTexture.repeat.set(4, 4) // repeat the texture 8 times in both directions
floorColorTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction
floorColorTexture.wrapT = THREE.RepeatWrapping // repeat in vertical direction
floorColorTexture.colorSpace = THREE.SRGBColorSpace // set the color space to sRGB for correct color rendering, only for color textures, bcz they are encoded in sRGB to optimize how color is stored according to how color is perceived by human eyes, other textures like normal, arm, displacement are not encoded in sRGB, so we don't set the color space for them

floorARMTexture.repeat.set(4, 4) // repeat the texture 8 times in both directions
floorARMTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction
floorARMTexture.wrapT = THREE.RepeatWrapping // repeat in vertical direction

floorNormalTexture.repeat.set(4, 4) // repeat the texture 8 times in both directions
floorNormalTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction
floorNormalTexture.wrapT = THREE.RepeatWrapping // repeat in vertical direction

floorDisplacementTexture.repeat.set(4, 4) // repeat the texture 8 times in both directions
floorDisplacementTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction
floorDisplacementTexture.wrapT = THREE.RepeatWrapping // repeat in vertical direction

// Wall
const wallColorTexture = textureLoader.load('./wall/mossy_brick_1k/mossy_brick_diff_1k.jpg')
const wallARMTexture = textureLoader.load('./wall/mossy_brick_1k/mossy_brick_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./wall/mossy_brick_1k/mossy_brick_nor_gl_1k.jpg')

wallColorTexture.repeat.set(1.5, 1.5) // repeat the texture 8 times in both directions
wallColorTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction
wallColorTexture.wrapT = THREE.RepeatWrapping // repeat in vertical direction
wallColorTexture.colorSpace = THREE.SRGBColorSpace // set the color space to sRGB for correct color rendering, only for color textures, bcz they are encoded in sRGB to optimize how color is stored according to how color is perceived by human eyes, other textures like normal, arm, displacement are not encoded in sRGB, so we don't set the color space for them

wallARMTexture.repeat.set(1.5, 1.5) // repeat the texture 8 times in both directions
wallARMTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction
wallARMTexture.wrapT = THREE.RepeatWrapping // repeat in vertical direction

wallNormalTexture.repeat.set(1.5, 1.5) // repeat the texture 8 times in both directions
wallNormalTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction
wallNormalTexture.wrapT = THREE.RepeatWrapping // repeat in vertical direction

// Roof
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg')
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg')

roofColorTexture.colorSpace = THREE.SRGBColorSpace // set the color space to sRGB for correct color rendering, only for color textures, bcz they are encoded in sRGB to optimize how color is stored according to how color is perceived by human eyes, other textures like normal, arm, displacement are not encoded in sRGB, so we don't set the color space for them

roofColorTexture.repeat.set(3, 1) // repeat the texture 8 times in both directions
roofARMTexture.repeat.set(3, 1) // repeat the texture 8 times in both directions
roofNormalTexture.repeat.set(3, 1) // repeat the texture 8 times in both directions

roofColorTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction
roofARMTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction
roofNormalTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction

// Bushes
const bushColorTexture = textureLoader.load('./bush/forest_leaves_03_1k/forest_leaves_03_diff_1k.jpg')
const bushARMTexture = textureLoader.load('./bush/forest_leaves_03_1k/forest_leaves_03_arm_1k.jpg')
const bushNormalTexture = textureLoader.load('./bush/forest_leaves_03_1k/forest_leaves_03_nor_gl_1k.jpg')

bushColorTexture.colorSpace = THREE.SRGBColorSpace // set the color space to sRGB for correct color rendering, only for color textures, bcz they are encoded in sRGB to optimize how color is stored according to how color is perceived by human eyes, other textures like normal, arm, displacement are not encoded in sRGB, so we don't set the color space for them

bushColorTexture.repeat.set(2, 1) // repeat the texture 8 times in both directions
bushARMTexture.repeat.set(2, 1) // repeat the texture 8 times in both directions
bushNormalTexture.repeat.set(2, 1) // repeat the texture 8 times in both directions

bushColorTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction
bushARMTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction
bushNormalTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction

// Grave
const graveColorTexture = textureLoader.load('./grave/cracked_concrete_wall_1k/cracked_concrete_wall_diff_1k.jpg')
const graveARMTexture = textureLoader.load('./grave/cracked_concrete_wall_1k/cracked_concrete_wall_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('./grave/cracked_concrete_wall_1k/cracked_concrete_wall_nor_gl_1k.jpg')

graveColorTexture.colorSpace = THREE.SRGBColorSpace // set the color space to sRGB for correct color rendering, only for color textures, bcz they are encoded in sRGB to optimize how color is stored according to how color is perceived by human eyes, other textures like normal, arm, displacement are not encoded in sRGB, so we don't set the color space for them

// graveColorTexture.repeat.set(0.3, 0.4)
// graveARMTexture.repeat.set(0.3, 0.4)
// graveNormalTexture.repeat.set(0.3, 0.4)

graveColorTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction
graveARMTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction
graveNormalTexture.wrapS = THREE.RepeatWrapping // repeat in horizontal direction

// Door
const doorColorTexture = textureLoader.load('./door/color.jpg')
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorMetalnessOcclusionTexture = textureLoader.load('./door/metalness.jpg')
const doorNormalTexture = textureLoader.load('./door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace // set the color space to sRGB for correct color rendering, only for color textures, bcz they are encoded in sRGB to optimize how color is stored according to how color is perceived by human eyes, other textures like normal, arm, displacement are not encoded in sRGB, so we don't set the color space for them

/**
 * House
 */

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100), // 20 meters by 20 meters
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3, // adjust the scale of the displacement, bcz it can be too strong, so we reduce it to 0.1
        displacementBias: -0.2
    })
)
floor.rotation.x = - Math.PI * 0.5 // we can only see one side of triangle in Three.js so rotate it in other direction
scene.add(floor)

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('Floor Displacement Scale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('Floor Displacement Bias')



// create a group in case we want to move or scale the whole group
// House container
const house = new THREE.Group()
scene.add(house)

// Walls
// 4 by 4 meters, 2.5 meters high(y-axis)
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        color: '#ff00c8',
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture,
        normalScale: new THREE.Vector2(3, 3) // default value, but we can adjust it to make the normal map more or less strong, if we set it to (0.5, 0.5), it will be half as strong, if we set it to (2, 2), it will be twice as strong
    })
)
walls.position.y += 1.25 // move it up by half of its height, so it sits on the floor
gui.add(walls.material.normalScale, 'x').min(-1).max(3).step(0.001).name('Wall Normal Scale X')
gui.add(walls.material.normalScale, 'y').min(-1).max(3).step(0.001).name('Wall Normal Scale Y')
gui.addColor(walls.material, 'color').name('Wall Color')
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4), // radius, height, segments
    new THREE.MeshStandardMaterial({ 
        color: '#f7cce8',
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
     })
)
roof.position.y += 2.5 + 0.5 // move it up by the height of the walls and half of the roof height, bcz cone's origin is at its center
roof.rotation.y = Math.PI * 0.25
gui.addColor(roof.material, 'color').name('Roof Color')

house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100), // width, height
    new THREE.MeshStandardMaterial({ 
        color: 'rgb(112, 88, 89)',
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        roughnessMap: doorRoughnessTexture,
        metalnessMap: doorMetalnessOcclusionTexture,
        normalMap: doorNormalTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        displacementBias: -0.05
    })
)
gui.addColor(door.material, 'color').name('Door Color')
door.position.y = 1 // in the texture there is a margin, so moving up by 1 instead of 1.1 which would have made it elevated
door.position.z = 2 + 0.01 // move it slightly in front of the walls to prevent z-fighting, bcz they are in the same position
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16) // radius 1, default size, then tweak using scale, 16 segments for smoothness
const bushMaterial = new THREE.MeshStandardMaterial({ 
    color: '#8fef8f',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture,
 })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5) // make it smaller
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = - 0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25) // make it smaller
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = - 0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4) // make it smaller
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = - 0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15) // make it smaller
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = - 0.75

house.add(bush1, bush2, bush3, bush4)


// Graves
// const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
// const graveMaterial = new THREE.MeshStandardMaterial({ color: '#2D2D2D' })

const graves = new THREE.Group()
scene.add(graves)
const graveShape = new THREE.Shape()

graveShape.moveTo(-0.3, 0)
graveShape.lineTo(0.3, 0)
graveShape.lineTo(0.3, 0.5)

graveShape.quadraticCurveTo(0.3, 0.7, 0, 0.7)
graveShape.quadraticCurveTo(-0.3, 0.7, -0.3, 0.5)

graveShape.lineTo(-0.3, 0)

const graveGeometry = new THREE.ExtrudeGeometry(graveShape, {
    depth: 0.15,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2
})

graveGeometry.center()

const graveMaterial = new THREE.MeshStandardMaterial({
    color: "#6b6969",
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture,
})
gui.addColor(graveMaterial, 'color').name('Grave Color')
for(let i = 0; i < 30; i++) {
   
    const angle = Math.random() * Math.PI * 2 // random angle around the house, circle angle
    const radius = 3 + Math.random() * 4 // random radius from the house, between 3 and 7 meters;
    // in trigo, if you send angle to sin and cos, you get the x and z coordinates of the point on the circle, so we can use that to position the graves around the house
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    
    //Mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, Math.random() * 0.35, z)
    grave.rotation.x = (Math.random() - 0.5) * 0.4 // random rotation between -0.2 and 0.2 radians
    grave.rotation.y = (Math.random() - 0.5) * 0.4 // random rotation between -0.2 and 0.2 radians
    grave.rotation.z = (Math.random() - 0.5) * 0.4 // random rotation between -0.2 and 0.2 radians
    grave.scale.x = 0.6 + Math.random() * 0.4 // random scale between 0.6 and 1
    // Add to graves group
    graves.add(grave)
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#df8ba4', 0.35)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#bdd5ec', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door Light
const doorLight = new THREE.PointLight('#c60d0d', 9) // color, intensity, distance
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#8800ff', 6, 3) // color, intensity, distance
const ghost2 = new THREE.PointLight('#ff0088', 6, 3) // color, intensity, distance
const ghost3 = new THREE.PointLight('#bc0505', 6, 3) // color, intensity, distance
scene.add(ghost1, ghost2, ghost3)

gui.addColor(ambientLight, 'color').name('Ambient Light Color')
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient Light Intensity')
gui.addColor(directionalLight, 'color').name('Directional Light Color')
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001).name('Directional Light Intensity')
gui.addColor(doorLight, 'color').name('Door Light Color')
gui.add(doorLight, 'intensity').min(0).max(1).step(0.001).name('Door Light Intensity')
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// cast and receive
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for(const grave of graves.children) {
    grave.castShadow = true
    grave.receiveShadow = true
}

// Mapping - need to reduce resolution and set the amplitude of Orthographic camera, and also set far and near of camera
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

/**
 * Sky
 */
const sky = new Sky()
sky.scale.set(100, 100, 100)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -.038, -0.95)

scene.add(sky)

/**
 * Fog
 */
// scene.fog = new THREE.Fog('#262837', 1, 13) // color, near - how far away from camera fog starts, far - how far away from camera will the fog be completely opaque
scene.fog = new THREE.FogExp2('#02343f', 0.1) // color, density - how strong the fog is, higher value means stronger fog, it will be exponential so it will increase faster as you go further away from the camera
gui.addColor(scene.fog, 'color').name('Fog Color')
/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer instead of clock, bcz there were some bugs
    // Tests if tab is inactive and stops the timer, so it doesn't update the elapsed time, prevents large values

    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5 // speed
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)// up and down movement, to make it irregular, we can use different multipliers for the angle and sins

    const ghost2Angle = - elapsedTime * 0.38 // speed, different direction
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)// up and down movement, to make it irregular, we can use different multipliers for the angle and sins

    const ghost3Angle = elapsedTime * 0.23 // speed, different direction
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)// up and down movement, to make it irregular, we can use different multipliers for the angle and sins

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()