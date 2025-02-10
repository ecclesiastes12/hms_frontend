import { useState, useEffect } from "react";

const SvgIconLoader = ({ name, ...props }) => {
  const [IconComponent, setIconComponent] = useState(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        // Dynamically import the SVG as a React component
        const icon = await import(`../assets/icons/${name}.svg?react`);
        setIconComponent(icon.default);
      } catch (error) {
        console.error(`Failed to load icon: ${name}`, error);
      }
    };

    loadIcon();
  }, [name]);

  if (!IconComponent) {
    return null; // or return a loading spinner
  }

  return <IconComponent {...props} />;
};
export default SvgIconLoader;
