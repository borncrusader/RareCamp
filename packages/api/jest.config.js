process.env.DISEASE_TABLE = 'DiseaseTable'
process.env.PROGRAM_TABLE = 'ProgramTable'
process.env.PROJECT_TABLE = 'ProjectTable'
process.env.USER_TABLE = 'UserTable'
process.env.WORKSPACE_TABLE = 'WorkspaceTable'

module.exports = {
  preset: 'jest-dynalite',
}
