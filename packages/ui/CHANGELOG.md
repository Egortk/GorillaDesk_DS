# @gorilladesk/ui

## 0.2.0

### Minor Changes

- 72380af: Add Checkbox (checked / indeterminate, description, error, read-only) and CheckboxGroup.
- 0fd338d: Add TextArea (box / inline, vertical resize in box), InputGroup (inline fields with shared borders), AddressInput and PhoneInput. Input, SearchField and Select mark their visible box with `data-field-frame` so groups can round only the outer corners.
- 4e47e13: Add Radio and RadioGroup (one error for the group, 24 px click area, faint dot preview on hover).
- 4968974: Add SearchField (box / inline / embedded, search icon, clear button). `embedded` sits at the top of a Popover menu and filters the list with React Aria Autocomplete. Input now takes its field styles from a shared module; its look is unchanged. Tokens: `space/search-field/embedded/padding-x`, `color/list-item/bg/danger/*`.
- 4968974: Add Select, ListBox, ListBoxItem and Popover. Tokens: `color/list-item/bg/*`, `space/list-item/*`, `radius/list-item`.
- ba850fd: Add UserChip: a person (avatar + name) as a non-interactive chip, `kind` pill/plain, `size` sm/xs, optional lozenge (sm) and dismiss button; long names truncate with an ellipsis.

### Patch Changes

- Updated dependencies [4968974]
- Updated dependencies [4968974]
  - @gorilladesk/tokens@0.2.0
