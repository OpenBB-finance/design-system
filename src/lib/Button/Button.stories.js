import { storiesOf } from "@storybook/react";

import { Button } from "./Button";

storiesOf("Button", module)
  .add("primary", () => (
    <div className="flex flex-col gap-2">
      <Button size="xs">Primary extra small</Button>
      <Button size="sm">Primary small</Button>
      <Button size="md">Primary medium</Button>
      <Button size="md" disabled>
        Primary medium disabled
      </Button>
    </div>
  ))
  .add("secondary", () => (
    <div className="flex flex-col gap-2">
      <Button size="xs" variant="secondary">
        Secondary extra small
      </Button>
      <Button size="sm" variant="secondary">
        Secondary small
      </Button>
      <Button size="md" variant="secondary">
        Secondary medium
      </Button>
      <Button size="md" variant="secondary" disabled>
        Secondary medium disabled
      </Button>
    </div>
  ))
  .add("tertiary", () => (
    <div className="flex flex-col gap-2">
      <Button size="xs" variant="tertiary">
        Tertiary extra small
      </Button>
      <Button size="sm" variant="tertiary">
        Tertiary small
      </Button>
      <Button size="md" variant="tertiary">
        Tertiary medium
      </Button>
      <Button size="md" variant="tertiary" disabled>
        Tertiary medium disabled
      </Button>
    </div>
  ));
