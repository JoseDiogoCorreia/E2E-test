@Library('ene') _ene
@Library('ene-scripted') _eneScripted

// Configuration
properties([
  disableConcurrentBuilds(abortPrevious: true),
  parameters([
    string(name: 'ARTIFACT_VERSION', description: 'Semver of the version to deploy'),
    string(name: 'EPHEMERAL_ID', description: 'Ephemeral ID number. Applicable when ENVIRONMENT is ephemeral.'),
  ])
])
def artifactEnvironment = env.BRANCH_NAME == 'main' ? 'qa' : 'dev'
def appEnvironment = env.BRANCH_NAME == 'main' ? 'qa' : "eph${params.EPHEMERAL_ID}"
def isEphemeral = appEnvironment.startsWith('eph')

currentBuild.description = "Version: ${params.ARTIFACT_VERSION} against ${appEnvironment}"

// DEEPINFRA never uses Vault QA instance.
// PROD uses PROD instance, anything else uses DEV instance.
String deepinfraVaultInstance = artifactEnvironment == 'qa' ? 'dev' : artifactEnvironment

// Containers definition
// @see https://wiki.app.pconnect.biz/display/ENE/Jenkins+-+Pod+Template+generation
def containers = [
  [
    containerName: 'node-playwright',
    imageUrl: 'art.pmideep.com/dcx-docker-prod/node-playwright',
    resources: [rCPU: '500m', rMemory: '1Gi', lCPU: '1000m', lMemory: '2Gi'],
    volumeMounts: [[mountPath: '/mnt/npm', volumeName: 'npm-artifactory-config']],
    commands: ['cat'],
  ],
]

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
  RunLess([
    LessStage(
      name: 'Fetch artifact',
      steps: [
        LessStepArtifactDownload(
          containerName: 'node-playwright',
          artifactEnvironment: artifactEnvironment,
          artifactName: 'dcx-e2e-tests',
          artifactVersion: params.ARTIFACT_VERSION,
          artifactDestination: './artifact.zip',
        ),
        LessStepShell(
          containerName: 'node-playwright',
          scripts: [
            'unzip ./artifact.zip -d .',
            'rm ./artifact.zip',
          ],
        ),
      ]
    ),
    LessStage(
      name: 'Run Tests',
      steps: [
        LessStepShell(
          name: 'dcx-e2e',
          containerName: 'node-playwright',
          environmentVariables: [
            'HEADLESS': 'true',
            'SSR_GLOBAL_HOST': env.BRANCH_NAME == "main"
              ? "https://pp.global-ssr.iqos.com"
              : "https://ssr-global.${appEnvironment}.dcx-dev.aws.pmicloud.biz",
            'NPM_CONFIG_CACHE': "${WORKSPACE}/.npm"
          ],
          scripts: [
            "sed -e '2,4d' /mnt/npm/npmrc > .npmrc",
            "sed -i 's/\\/ene-npm-prod//g' .npmrc",
            "sed -i 's/\\/\\/https://g' .npmrc",
            'npm config ls',
            'npm ci --omit=dev',
            'npm start'
          ],
          publish: ['Global SSR E2E Test Report': 'reports']
        )
      ]
    )
  ])
} }
