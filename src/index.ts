import { Components as StandaloneComponents } from "./components/standalone";
import { Components as InertiaComponents } from "./components/inertia";

interface BitbossOptions {
  components?: string[];
  inertia?: boolean;
}

export default {
  install: (app: any, options?: BitbossOptions) => {
    Object.keys(StandaloneComponents).forEach((componentName) => {
      if (options?.components && !options?.components?.includes(componentName))
        return;
      app.component(
        componentName,
        (StandaloneComponents as any)[componentName]
      );
    });

    if (options?.inertia) {
      Object.keys(InertiaComponents).forEach((componentName) => {
        if (
          options?.components &&
          !options?.components?.includes(componentName)
        )
          return;
        app.component(componentName, (InertiaComponents as any)[componentName]);
      });
    }
  },
};
