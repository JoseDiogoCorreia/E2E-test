@Library('ene') _ene
@Library('ene-scripted') _eneScripted

// Configuration
properties([
  disableConcurrentBuilds(abortPrevious: true),
  parameters([
      string(name: 'ARTIFACT_VERSION', defaultValue: '0.0.1', description: 'Semver of the version to publish'),
      booleanParam(name: 'SKIP_QUALITY_ASSURANCE', defaultValue: false, description: 'When true, quality assurance steps are skipped'),
    ]),
])
currentBuild.description = "Version: ${params.ARTIFACT_VERSION}"

def artifactEnvironment = env.BRANCH_NAME == 'main' ? 'qa' : 'dev'
def publishLatest = env.BRANCH_NAME == 'main'

// Containers definition
// @see https://wiki.app.pconnect.biz/display/ENE/Jenkins+-+Pod+Template+generation
def containers = [
  [containerName: 'node', imageUrl: 'art.pmideep.com/dockerhub/node:19.4.0',  volumeMounts: [[mountPath: '/usr/local/etc', volumeName: 'npm-artifactory-config']], resources: [rCPU: '2000m', rMemory: '2Gi', lCPU: '4000m', lMemory: '4Gi'], commands: ['cat']],]
def volumes = [
  [
    volumeName: 'npm-artifactory-config',
    type: 'secret',
    secretConfig: [secretName: "artifactory-npm-${artifactEnvironment}", key: "npmrc${artifactEnvironment}", path: 'npmrc'],
  ],
]

podTemplate(yaml: PodTemplateGeneration(
        containers: containers,
        volumes: volumes,
        productCode: 'dcx',
        envName: 'prod',
        accName: "dcx-${artifactEnvironment}-aws",
)) { node(POD_LABEL) {

  checkout(scm)

  dir('e2e-tests') {

    RunLess([
      LessStage(
        name: 'Install dependencies',
        steps: [LessStepShell(containerName: 'node', scripts: ["npm ci"])]
      ),
  //       LessStage(
  //         name: 'Quality Assurance',
  //         parallel: true,
  //         environmentVariables: [
  //           'NPM_CONFIG_CACHE': "${WORKSPACE}/.npm", // prevents `npm WARN logfile Error: EACCES: permission denied, scandir '/root/.npm/_logs'`
  //         ],
  //         steps: [
  //           LessStepShell(
  //             name: 'Lint',
  //             containerName: 'node',
  //             scripts: ['npm run lint:ci'],
  //             publish: ["Lint report": "out/lint"]
  //           ),
  //         ],
  //       ),
      LessStage(
        name: 'Bundle',
        steps: [LessStepShell(containerName: 'node', scripts: ['npm run bundle'])]
      ),
      LessStage(
        name: 'Publish',
        steps: [
          LessStepArtifactPublish(
            containerName: 'node',
            artifactPath: "out/pack/dcx-e2e-tests.zip",
            artifactName: "dcx-e2e-tests",
            artifactEnvironment: artifactEnvironment,
            artifactVersion: "${params.ARTIFACT_VERSION}",
            publishLatest: publishLatest
          )
        ]
      )
    ])
  }
} }


