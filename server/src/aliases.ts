import moduleAlias from "module-alias"

moduleAlias.addAliases({
  "@root": `${__dirname}/`,
  "@database": `${__dirname}/database`,
  "@interfaces": `${__dirname}/interfaces`,
  "@config": `${__dirname}/config`,
  "@libraries": `${__dirname}/libraries`,
  "@services": `${__dirname}/services`,
  "@helpers": `${__dirname}/helpers`
})
