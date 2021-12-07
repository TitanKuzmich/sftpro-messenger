let gulp = require("gulp")
let eslint = require("gulp-eslint")
let sourcemaps = require("gulp-sourcemaps")
let typescript = require("gulp-typescript")
let rimraf = require("rimraf")

const BUILD = "build"
const CLEAN_BUILD = "clean:build"
const ESLINT = "ESLINT"
const COPYENV = "copy"
const COMPILE_TYPESCRIPT = "compile:typescript"
const COPY_YAML = "copy:yaml"
const TS_SRC_GLOB = "./src/**/*.ts"
const TS_GLOB = [TS_SRC_GLOB]

const tsProject = typescript.createProject("tsconfig.json")

// Removes the ./build directory with all its content.
gulp.task(CLEAN_BUILD, function (callback) {
  rimraf("./build", callback)
})

gulp.task(COPYENV, function () {
  return gulp.src("../shared/.env", { allowEmpty: true }).pipe(gulp.dest("./"))
})

// Checks all *.ts-files if they are conform to the rules specified in ESLINT.json.
gulp.task(ESLINT, function () {
  return gulp.src(TS_GLOB).pipe(eslint({ formatter: "verbose" }))
})

gulp.task(COMPILE_TYPESCRIPT, function () {
  return gulp
    .src(TS_GLOB)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write(".", { sourceRoot: "../src" }))
    .pipe(gulp.dest("build"))
})

gulp.task(COPY_YAML, function () {
  return gulp.src("./src/**/*.yaml").pipe(gulp.dest("build"))
})

// Runs all required steps for the build in sequence.
gulp.task(BUILD, gulp.series(CLEAN_BUILD, ESLINT, COMPILE_TYPESCRIPT, COPY_YAML, COPYENV))

gulp.task(
  "watch",
  gulp.series(BUILD, function () {
    return nodemon({
      ext: "ts json",
      script: "build/server.js",
      watch: ["src/*", "test/*"],
      legacyWatch: true,
      tasks: [BUILD]
    })
  })
)
