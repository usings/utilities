import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  declaration: false,
  failOnWarn: true,
  rollup: {
    emitCJS: true,
  },
})
