import Image from 'next/image'

export const LogoSmall = () => {
  return (
    <div className="h-24 w-auto md:h-32">
      <Image
        src="/zenus-logo-full.png"
        alt="Zenus"
        width={300}
        height={96}
        className="h-full w-auto object-contain brightness-0 invert"
        priority
      />
    </div>
  )
}
