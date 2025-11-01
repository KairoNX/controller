import Image from 'next/image'

export const LogoSmall = () => {
  return (
    <div className="h-10 w-auto">
      <Image
        src="/zenus-logo-full.png"
        alt="Zenus"
        width={120}
        height={40}
        className="h-full w-auto object-contain"
        priority
      />
    </div>
  )
}
