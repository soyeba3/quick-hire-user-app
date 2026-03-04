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
    // Basic alert for now, can be replaced with a real UI component later
    alert(
      `${variant.toUpperCase()}: ${title ? title + " - " : ""}${description}`,
    );
  };

  return { showToast };
};
