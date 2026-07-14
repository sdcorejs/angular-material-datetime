# Screen Flow — Showcase Refresh

Requirements are inferred from the current showcase and need owner confirmation.

| User intent | Entry | Screen/section | State | Primary action | Outcome |
| --- | --- | --- | --- | --- | --- |
| Evaluate visual quality | Direct visit | Hero workbench | Picker open with initial value | Change date/time, Apply | Value preview updates |
| Install package | Hero | Install command | Default / copied | Copy install | Command copied with visible feedback |
| Find basic usage | Hero CTA/nav | Quick start | Featured live example | Open picker / view source | User sees minimal implementation |
| Validate forms behavior | Example categories | Forms & validation | Empty / invalid / valid / disabled | Run validation | Error or accepted value is visible |
| Inspect customization | Example categories | Customization | Seconds / step / custom actions | Select example | Live control and code appear together |
| Check API contract | Nav/section link | API | Table / mobile scroll | Copy API name | Symbol/config understood |
| Apply theme | Nav/section link | Theming | Light/dark/token examples | Copy SCSS | Theme snippet copied |

## Navigation model

```text
Hero workbench
  ├─ Try live examples → Quick start
  ├─ Copy install
  └─ GitHub/npm

Quick start
  ├─ Forms & validation
  ├─ Customization
  └─ Advanced composition

Reference
  ├─ API
  └─ Theming
```

## State expectations

- Picker closed/open/applied/cancelled states keep layout stable.
- Code collapsed/expanded stays within the workbench column and never widens the document.
- Validation state pairs color with explicit error copy.
- Disabled example remains visibly disabled and provides a clear `Enable example` action.
- On mobile, anchor navigation must not obscure section headings under the sticky header.
