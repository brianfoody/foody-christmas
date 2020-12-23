import { observer } from "mobx-react-lite";
import { useMst } from "../models/root";

export const Todos = observer(() => {
  const { cousins } = useMst();

  return (
    <div>
      {cousins.map((cousin) => (
        <div key={cousin.name}>
          <input
            type="checkbox"
            checked={cousin.totalItems > 0}
            onChange={(e) =>
              cousin.addPresent({
                name: "treat",
                price: 100,
              })
            }
          />
          <input type="text" value={cousin.name} onChange={(e) => {}} />
        </div>
      ))}
    </div>
  );
});
