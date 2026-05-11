Generate a new Angular standalone component following this project's conventions.

**Usage:** `/component <name> [path]`

Rules to follow when generating the component:
- Standalone by default — do NOT add `standalone: true` (it's the default in Angular v20+)
- `changeDetection: ChangeDetectionStrategy.OnPush`
- Use `input()` / `output()` functions, never `@Input()` / `@Output()` decorators
- Use `inject()` for dependency injection, never constructor injection
- Use signals for local state, `computed()` for derived state
- Native control flow: `@if`, `@for`, `@switch` — never `*ngIf`, `*ngFor`
- No `ngClass` or `ngStyle` — use `[class]` and `[style]` bindings
- Tailwind CSS for styling — no inline styles, no standard Tailwind color classes (use hex values)
- Place the file at `src/app/$path/$name.component.ts` (inline template preferred for small components)

Ask the user for the component name and optional path if not provided in the arguments.
