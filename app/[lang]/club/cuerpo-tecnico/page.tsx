import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import membersData from '@/content/members.json'

interface Member {
  id: string
  nameGl: string
  nameEs: string
  roleGl: string
  roleEs: string
  licencia?: string
  categoriesGl?: string[]
  categoriesEs?: string[]
  email?: string
  photo: string | null
  bio?: string
}

function MemberCard({
  member,
  lang,
  licenciaLabel,
  categoriesLabel,
}: {
  member: Member
  lang: string
  licenciaLabel: string
  categoriesLabel: string
}) {
  const name = lang === 'gl' ? member.nameGl : member.nameEs
  const role = lang === 'gl' ? member.roleGl : member.roleEs
  const categories = lang === 'gl' ? member.categoriesGl : member.categoriesEs
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')

  return (
    <div className="bg-white border-t-4 border-blue">
      {/* Photo / placeholder */}
      <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={member.photo} alt={name} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="font-display font-black text-5xl text-navy/20 uppercase">{initials}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-display font-black text-xl uppercase tracking-tight text-black leading-none mb-1">
          {name}
        </h3>
        <p className="font-body text-blue text-xs uppercase tracking-widest font-semibold mb-4">
          {role}
        </p>

        {categories && categories.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-body mb-1">{categoriesLabel}</p>
            <p className="text-sm font-body text-gray-700">{categories.join(', ')}</p>
          </div>
        )}

        {member.licencia && (
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-body mb-1">{licenciaLabel}</p>
            <p className="text-sm font-body text-gray-700">{member.licencia}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function DirectivaCard({ member, lang }: { member: Member; lang: string }) {
  const name = lang === 'gl' ? member.nameGl : member.nameEs
  const role = lang === 'gl' ? member.roleGl : member.roleEs

  return (
    <div className="bg-white p-6 flex items-center gap-5 border-l-4 border-navy">
      <div className="w-12 h-12 rounded bg-navy/10 flex items-center justify-center flex-shrink-0">
        <span className="font-display font-black text-lg text-navy uppercase">
          {name.split(' ').slice(0, 2).map((n) => n[0]).join('')}
        </span>
      </div>
      <div>
        <p className="font-display font-black text-base uppercase tracking-tight text-black leading-none mb-0.5">
          {name}
        </p>
        <p className="font-body text-xs text-blue uppercase tracking-widest font-semibold">{role}</p>
        {member.email && (
          <a href={`mailto:${member.email}`} className="font-body text-xs text-gray-500 hover:text-blue transition-colors mt-0.5 block">
            {member.email}
          </a>
        )}
      </div>
    </div>
  )
}

export default async function CuerpoTecnicoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const ct = dict.corpoTecnico

  return (
    <>
      <PageHero
        kicker={dict.nav.club}
        title={dict.pages.cuerpoTecnico.title}
        subtitle={dict.pages.cuerpoTecnico.description}
        breadcrumbs={[{ label: dict.nav.club, href: `/${lang}/club` }]}
      />

      {/* Entrenadores */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black mb-10">
            {ct.coachesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {membersData.corpo.map((member) => (
              <MemberCard
                key={member.id}
                member={member as Member}
                lang={lang}
                licenciaLabel={ct.licenciaLabel}
                categoriesLabel={ct.categoriesLabel}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Directiva */}
      <section className="bg-gray-100 py-20 lg:py-28">
        <Container>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black mb-10">
            {ct.directivaTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {membersData.directiva.map((member) => (
              <DirectivaCard key={member.id} member={member as Member} lang={lang} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
