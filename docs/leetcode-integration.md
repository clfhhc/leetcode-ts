# LeetCode Integration

This project now includes automatic LeetCode problem fetching and file generation. You can create new problem files directly from LeetCode with all metadata, descriptions, constraints, and test cases automatically populated.

## Usage

### Create a new problem from LeetCode

```bash
# Using the CLI with LeetCode slug
npx tsx packages/src/cli.ts new --from-leetcode --leetcode-slug two-sum

# Or just use the --from-leetcode flag and you'll be prompted for the slug
npx tsx packages/src/cli.ts new --from-leetcode
```

### What gets automatically populated

When you fetch from LeetCode, the following information is automatically extracted and populated:

1. **Problem Metadata**:
   - Problem ID and title
   - Difficulty level (Easy/Medium/Hard)
   - Topic tags (array, hash-table, etc.)
   - LeetCode slug

2. **Problem Description**:
   - Full problem description with examples
   - Constraints
   - All example test cases

3. **Input Schema**:
   - Automatically generated Zod schema based on LeetCode's metadata
   - Proper TypeScript types inferred from the schema

4. **Test Cases**:
   - All example test cases from LeetCode
   - Properly formatted as TypeScript objects
   - Input and expected output correctly parsed

5. **TSDoc Comments**:
   - Problem description
   - Constraints
   - Examples
   - Placeholder for approach and complexity analysis

## Example

Running:
```bash
npx tsx packages/src/cli.ts new --from-leetcode --leetcode-slug valid-parentheses
```

Will generate a file like `0020-valid-parentheses.ts` with:

- Complete problem description
- Input schema: `z.object({ s: z.string() })`
- Output type: `boolean`
- All 5 example test cases properly formatted
- All metadata (tags: string, stack; difficulty: easy)

## Manual Override

If LeetCode fetching fails or you prefer manual input, the CLI will fall back to the original manual input mode where you can enter all details manually.

## File Structure

The generated files follow the same structure as manually created files and are fully compatible with the existing build system and website.
