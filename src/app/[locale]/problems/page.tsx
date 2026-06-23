import { useTranslations } from "next-intl";
import { FileText } from "lucide-react";

export default function PastProblems() {
  const t = useTranslations("problems");
  const t_files = useTranslations();
  const problems = t_files.raw("problems.files");

  return (
    <div className="mx-auto max-w-4xl p-6 lg:px-8 py-12">
      <div className="flex flex-col justify-center items-center mb-8">
        <h2 className="text-4xl font-bold mb-2">{t("title")}</h2>
        <div className="h-1 w-72 rounded-lg" style={{ backgroundColor: "#1D3AAC" }} />
      </div>
      <ul className="space-y-3 max-w-xl mx-auto">
        {problems.map((item, index) => (
          <li key={index}>
            <a
              href={item.file}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-2xl text-blue-700 hover:text-blue-900 transition"
            >
              <FileText className="w-5 h-5 text-[#1D3AAC]" />
              {item.name}
            </a>
            {item.note && (
              <p className="ml-7 mt-1 text-sm text-gray-600 italic">
                {item.note.includes('<link>') ? (
                  <>
                    {item.note.split('<link>')[0]}
                    <a 
                      href={item.noteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {item.note.split('<link>')[1].split('</link>')[0]}
                    </a>
                    {item.note.split('</link>')[1]}
                  </>
                ) : (
                  item.note
                )}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
