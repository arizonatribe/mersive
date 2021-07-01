#!/usr/bin/env node
/* eslint-disable no-console */
import chalk from "chalk"
import lightLogo from "./logo.js"
import darkLogo from "./logo_dark.js"

/**
 * Runs the Mersive ASCII branding logo
 *
 * @function
 * @name runBranding
 */
function runBranding() {
  const args = process.argv.slice(2)

  if (args.some(arg => /^(-h|--help)$/i.test(arg))) {
    console.log(chalk`
    {bold.green Prints out Mersive's logo (in ASCII art) to the shell}

    {bold.green Options:}
      {bold.yellow --dark}    Prints out the dark logo
      {bold.yellow --light}   Prints out the light logo

    {bold.yellow Examples}
      {bold.gray $ node }{bold.cyan scripts/branding.js}
      {bold.gray $ node }{bold.cyan scripts/branding.js }{bold.yellow --light}
      {bold.gray $ node }{bold.cyan scripts/branding.js }{bold.yellow --dark}
    `)
    process.exit(0)
  }

  try {
    if (args.some(arg => /^(--light|--light=true|--dark=false)$/i.test(arg))) {
      lightLogo()
    } else {
      darkLogo()
    }

    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

runBranding()
