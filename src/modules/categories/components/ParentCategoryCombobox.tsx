import { useState, useRef, useEffect } from "react";
import type { CategoriaRead } from "../types/Categories";

type Props = {
  value: string;
  onChange: (parentId: string) => void;
  categories: CategoriaRead[];
  excludeId?: number;
};

export const ParentCategoryCombobox = ({
  value,
  onChange,
  categories,
  excludeId,
}: Props) => {
  const selectedName =
    categories.find((c) => String(c.id) === value)?.nombre ?? "";

  const [query, setQuery] = useState(selectedName);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = categories.find((c) => String(c.id) === value)?.nombre ?? "";
    setQuery(name);
  }, [value, categories]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        const name =
          categories.find((c) => String(c.id) === value)?.nombre ?? "";
        setQuery(name);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [value, categories]);

  const filtered = categories.filter(
    (c) =>
      c.id !== excludeId &&
      c.nombre.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cat: CategoriaRead) => {
    onChange(String(cat.id));
    setQuery(cat.nombre);
    setOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setQuery("");
    setOpen(false);
  };

  const inputCls = `
    w-full rounded-lg border border-outline bg-surface-container-low
    px-4 py-3 pr-10 text-on-surface placeholder:text-on-surface-variant
    outline-none transition-all duration-200
    focus:border-primary focus:ring-2 focus:ring-primary/20
  `;

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (!e.target.value) onChange("");
          }}
          onFocus={() => setOpen(true)}
          placeholder="Buscar categoría padre..."
          className={inputCls}
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-error transition-colors text-lg leading-none"
          >
            ✕
          </button>
        )}
      </div>

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-surface border border-outline-variant rounded-lg shadow-lg max-h-48 overflow-y-auto font-admin">
          <button
            type="button"
            onClick={handleClear}
            className="w-full text-left px-4 py-2.5 text-sm text-on-surface-variant hover:bg-surface-container transition-colors italic"
          >
            Sin categoría padre
          </button>

          {filtered.length === 0 && query ? (
            <p className="px-4 py-2.5 text-sm text-on-surface-variant">
              Sin resultados para "{query}"
            </p>
          ) : (
            filtered.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelect(cat)}
                className={`
                  w-full text-left px-4 py-2.5 text-sm transition-colors
                  ${String(cat.id) === value
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-on-surface hover:bg-surface-container"
                  }
                `}
              >
                {cat.nombre}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
