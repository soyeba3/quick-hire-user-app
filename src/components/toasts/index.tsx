export const useToast = () => {
  const showToast = ({
    title,
    description,
    variant,
  }: {
    title?: string;
    description: string;
    variant: "success" | "error";
  }) => {
    alert(
      `${variant.toUpperCase()}: ${title ? title + " - " : ""}${description}`,
    );
  };

  return { showToast };
};
