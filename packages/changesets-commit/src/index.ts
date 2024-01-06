/* eslint-disable require-await */
import type { Changeset, CommitFunctions, ReleasePlan } from '@changesets/types'
import outdent from 'outdent'

const getAddMessage: CommitFunctions['getAddMessage'] = async (
  changeset: Changeset,
) => {
  return outdent`docs(changeset): ${changeset.summary}`
}

const getVersionMessage: CommitFunctions['getVersionMessage'] = async (
  releasePlan: ReleasePlan,
) => {
  const publishableReleases = releasePlan.releases.filter(release => release.type !== 'none')
  const numberPackagesReleased = publishableReleases.length

  const releasesLines = publishableReleases
    .map(release => `  ${release.name}@${release.newVersion}`)
    .join('\n')

  if (numberPackagesReleased === 1) {
    return outdent`chore: releasing ${releasesLines.trim()}`
  }

  return outdent`
    chore: releasing packages

    Releases:
    ${releasesLines}
  `
}

const defaultCommitFunctions: Required<CommitFunctions> = {
  getAddMessage,
  getVersionMessage,
}

export default defaultCommitFunctions
