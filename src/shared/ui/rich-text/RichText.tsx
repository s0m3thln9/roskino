const BOLD = /\*\*(.+?)\*\*/s;

type RichTextProps = {
  text: string;
};

export function RichText({ text }: RichTextProps) {
  return text.split(BOLD).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
