interface BackgroundGradientsProps {
  colors?: {
    first: string
    second: string
  }
  children?: React.ReactNode
}

export function BackgroundGradients({ 
  colors = {
    first: 'from-blue-500/10 to-purple-500/10',
    second: 'from-rose-500/10 to-orange-500/10'
  },
  children 
}: BackgroundGradientsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className={`absolute -top-24 right-0 w-96 h-96 bg-gradient-to-br ${colors.first} rounded-full mix-blend-multiply blur-3xl`}
        // style={{
        //   animation: 'moveUpDown 8s ease-in-out infinite'
        // }}
      />
      <div 
        className={`absolute -bottom-24 left-0 w-96 h-96 bg-gradient-to-br ${colors.second} rounded-full mix-blend-multiply blur-3xl`}
        // style={{
        //   animation: 'moveUpDown 8s ease-in-out infinite',
        //   animationDelay: '-4s'
        // }}
      />
      {children}
    </div>
  )
}