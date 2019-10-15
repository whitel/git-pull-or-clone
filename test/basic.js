const gitPullOrClone = require('../')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const test = require('tape')
const noop = () => { }

const TMP_PATH = path.join(__dirname, '..', 'tmp')
const OUT_PATH = path.join(TMP_PATH, 'git-pull-or-clone')
const REPO_URL = 'https://github.com/feross/git-pull-or-clone.git'
const OUT_PATH_2 = path.join(TMP_PATH, 'existing')

test('remove tmp folder', (t) => {
  rimraf.sync(TMP_PATH)
  t.end()
})

test('git clone', (t) => {
  t.plan(1)
  gitPullOrClone(REPO_URL, OUT_PATH, (err) => {
    t.error(err)
  })
})

test('git pull', (t) => {
  t.plan(1)
  gitPullOrClone(REPO_URL, OUT_PATH, (err) => {
    t.error(err)
  })
})

test('git pull without depth limit', (t) => {
  t.plan(1)
  gitPullOrClone(REPO_URL, OUT_PATH, { depth: Infinity }, (err) => {
    t.error(err)
  })
})

test('git pull with invalid depth', (t) => {
  t.plan(1)
  t.throws(
    () => gitPullOrClone(REPO_URL, OUT_PATH, { depth: 0 }, noop),
    /The "depth" option must be greater than 0/
  )
})

test('git clone & pull with existing dir', (t) => {
  t.plan(1)
  if (!fs.existsSync(OUT_PATH_2)) {
    fs.mkdirSync(OUT_PATH_2);
  }
  gitPullOrClone(REPO_URL, OUT_PATH_2, (err) => {
    t.error(err)
  })
})

test('test pull on clone in existing dir', (t) => {
  t.plan(1)
  gitPullOrClone(REPO_URL, OUT_PATH_2, (err) => {
    t.error(err)
  })
})

