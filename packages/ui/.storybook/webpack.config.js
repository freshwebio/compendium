const path = require('path')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          configFileName: './tsconfig.base.json',
        },
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          tsconfigPath: './tsconfig.base.json',
        },
      },
    ],
  })

  config.resolve.extensions.push('.ts', '.tsx')

  const initialAliases = config.resolve.alias
  config.resolve.alias = {
    ...initialAliases,
    '@atoms': path.resolve('src/components/atoms/'),
    '@molecules': path.resolve('src/components/molecules/'),
    '@organisms': path.resolve('src/components/organisms/'),
    '@templates': path.resolve('src/components/templates/'),
    '@ui': path.resolve('src/ui/'),
    '@utils': path.resolve('src/utils/'),
    '@hooks': path.resolve('src/hooks/'),
    '@typography': path.resolve('src/typography/'),
  }

  return config
}
