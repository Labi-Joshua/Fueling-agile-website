// Privacy Policy page (/privacy): a heading/intro hero matching the site's other
// simple text pages, followed by the sections of policy copy. Content is
// transcribed verbatim from the company's official policy document (see
// privacyPolicyContent in mockContent.ts), so this component just lays out
// whatever blocks that content provides rather than authoring any copy itself.
import type {
  PrivacyPolicyContent,
  PrivacyPolicyBlock,
  PrivacyPolicyListSubitem,
  PrivacyPolicyTextRun,
} from "@/data/mockContent";

export interface PrivacyPolicyProps {
  content: PrivacyPolicyContent;
}

function TextRun({ run }: { run: PrivacyPolicyTextRun }) {
  return typeof run === "string" ? <>{run}</> : <strong className="font-semibold text-brand-900">{run.bold}</strong>;
}

// a, b, c, ... z (the source document never nests deep enough to need aa/ab).
function letterFor(index: number) {
  return String.fromCharCode(97 + index);
}

function Subitem({ item }: { item: PrivacyPolicyListSubitem }) {
  return (
    <li className="flex gap-2 text-sm leading-relaxed text-brand-900/60">
      <span className="shrink-0">•</span>
      <span>
        {item.label ? <span className="font-medium text-brand-900">{item.label}: </span> : null}
        {item.text}
      </span>
    </li>
  );
}

function Block({ block }: { block: PrivacyPolicyBlock }) {
  if (block.type === "subheading") {
    return <p className="font-semibold text-brand-900">{block.text}</p>;
  }

  if (block.type === "list") {
    const isPlain = block.listStyle === "plain";

    return (
      <ul className="flex flex-col gap-3">
        {block.items?.map((item, index) => (
          <li key={index} className="flex gap-2 text-sm leading-relaxed text-brand-900/60">
            {!isPlain && <span className="shrink-0 font-medium text-brand-900">{letterFor(index)}.</span>}
            <span>
              {item.label ? <span className="font-medium text-brand-900">{item.label}: </span> : null}
              {item.text}
              {item.subitems && (
                <ul className="mt-2 flex flex-col gap-1.5">
                  {item.subitems.map((subitem, subIndex) => (
                    <Subitem key={subIndex} item={subitem} />
                  ))}
                </ul>
              )}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-sm leading-relaxed text-brand-900/60">
      {block.label ? <span className="font-medium text-brand-900">{block.label}: </span> : null}
      {block.text}
    </p>
  );
}

export default function PrivacyPolicy({ content }: PrivacyPolicyProps) {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 pt-20 text-center sm:px-8 sm:pt-28">
        <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
          {content.eyebrow}
        </span>
        <h1 className="mx-auto mt-3 font-heading text-2xl font-normal leading-[110%] tracking-[-2px] text-brand-900 sm:text-[56px]">
          {content.heading}
        </h1>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24 pt-12 text-left sm:px-8">
        <p className="font-semibold text-brand-900">Effective Date: {content.effectiveDate}.</p>
        <div className="mt-3 flex flex-col gap-3">
          {content.intro.map((paragraph, index) => (
            <p key={index} className="text-sm leading-relaxed text-brand-900/60">
              {paragraph.map((run, runIndex) => (
                <TextRun key={runIndex} run={run} />
              ))}
            </p>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-12">
          {content.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-semibold text-brand-900">
                {section.number ? `${section.number}. ` : ""}
                {section.heading}
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {section.blocks.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
