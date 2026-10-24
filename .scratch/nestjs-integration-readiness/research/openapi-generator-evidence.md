# Catalog-driven OpenAPI generator compatibility evidence

Research date: 2026-10-24. Research conclusion only; this does not select or approve tooling. No production files or dependencies changed.

## Recommendation for the human tooling decision

Prefer **Zod 4 native JSON Schema conversion plus a small explicit operation-catalog assembler**, conditional on an audited schema-feature guard, declared runtime-only semantics, and contract checks. Both examined lanes generate valid controller-independent OpenAPI 3.1 documents. Neither converter alone satisfies the approved visible-failure requirement. The native converter preserved the approved UTC timestamp restriction (UTC-Z and exactly three fractional digits) as a pattern; the purpose-built converter lost it in this probe. This is a recommendation from bounded evidence, not proof of universal conversion fidelity.

The assembler should emit HTTP metadata exclusively from the approved catalog and schemas exclusively from shared Zod definitions. Nest wrappers remain in apps/api. nestjs-zod can serve runtime validation/integration, but its decorator-generated specification must not replace the catalog. Later planning must demonstrate routes/status/security behavior conform to the catalog. This investigation does not test NestJS integration or browser/package builds.

## Evidence sources and compatibility scope

Context7 was resolved first to `/colinhacks/zod` and `/asteasolutions/zod-to-openapi`, then queried for native JSON conversion and registry/OpenAPI 3.1 behavior. Primary documentation/source and executable probes were used to resolve remaining gaps.

- [Zod JSON Schema documentation](https://zod.dev/json-schema): native Draft 2020-12 conversion, input/output modes, registry references, unsupported-type errors, metadata overrides. Native conversion does not construct HTTP operations.
- [Zod 4.6.7 converter source](https://github.com/colinhacks/zod/blob/v4.6.7/packages/zod/src/v4/core/to-json-schema.ts): versioned converter parameters, registries and customization surface.
- [Purpose-built generator README](https://github.com/asteasolutions/zod-to-openapi/blob/v9.1.0/README.md): registry operations, V31 generator, unsupported-type handling. Registry metadata can be supplied outside shared schemas.
- [Generator 9.1.0 package metadata](https://github.com/asteasolutions/zod-to-openapi/blob/v9.1.0/package.json): Zod peer `^4.0.0`, CJS and ESM entrypoints; no engines constraint declared there. These are observed versions, not adopted dependencies.
- [OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html#schema-object): Schema Objects support Draft 2020-12; operation objects supply parameters, responses and security. This research emits `openapi: 3.1.0`, within the approved 3.1 family.
- [Generator string transformer](https://github.com/asteasolutions/zod-to-openapi/blob/v9.1.0/src/transformers/string.ts) and [object transformer](https://github.com/asteasolutions/zod-to-openapi/blob/v9.1.0/src/transformers/object.ts): explicit regex checks and selected string formats are mapped; strict object catchalls produce closed objects.
- [Zod object/ISO documentation](https://zod.dev/api): plain objects strip extras, strict objects reject extras, ISO datetime schemas can constrain offsets. Nested objects require their own policy.

Published metadata was queried with `npm view`: Zod 4.6.7 and generator 9.1.0. The isolated probe used Node 24.22.0 and swagger-parser 12.1.0. It establishes these package combinations execute in CJS on that Node version. It does not establish the eventual TypeScript/compiler/module/export/browser matrix or package version pins; verify those during implementation planning per Q6.

## Actual checks and comparison

A temporary directory outside all workspaces installed exact dependencies; no app lockfile was touched. The appendix contains the complete executed probe. Nine assertions/check groups passed, including two full OpenAPI document validations through swagger-parser. The catalog supplies method, path, path/query parameters, operation ID, request schema, response statuses/schemas and security. Both outputs reference components and validate without any controller or Nest dependency.

| Criterion | Native conversion + assembly | zod-to-openapi 9.1.0 |
| --- | --- | --- |
| Catalog owns HTTP metadata | Explicit assembly from one catalog; probe asserts metadata | Registry populated from same catalog; probe asserts metadata |
| OpenAPI 3.1 | Full generated document validated | Full generated document validated |
| Distinct request/response schemas | Request input conversion; response output conversion | Separate schema objects supplied explicitly |
| Nested strict request/outgoing response | Root and nested `additionalProperties: false` | Same |
| Optional versus nullable | Omitted note not required; dueDate required and allows null via anyOf | Same semantics via type array |
| Determinism | Identical bytes on repeated fresh generation with same ordered input | Same in probe |
| Explicit regex | Preserved | Preserved |
| ISO date/UTC datetime | Format plus Zod-generated pattern retained | Format retained, underlying ISO pattern omitted |
| Unsupported void | Throws | Throws |
| Date / transform | Throws | Date becomes date-time string; transform becomes input string |
| Custom refinement | Silently omitted | Silently omitted |
| Coercion / default | Accepted by conversion, contrary to wire policy | Accepted by conversion, contrary to wire policy |

The probes intentionally observe bad schemas rather than treating conversion success as acceptance. They also demonstrate that tolerant readers strip extras at both levels while rejecting missing or invalid known fields. The response's declared fields are shared once; strict and tolerant objects are built from those same field definitions, including separately policy-wrapped nested objects. No independent handwritten payload contract is needed.

Determinism is bounded to fixed input/order and installed versions. A production pipeline should sort stable component/operation registration and serialization, exclude timestamps, reject duplicate operation/schema identities and check byte equality in fresh processes. Recursive schemas, full reference graphs, every parameter location/serialization style and all potential schema constructs were not exhaustively tested here. The appendix's native assembler uses named top-level components and does not prove a complete registry/ref relocation implementation.

## Expressiveness, runtime acceptance and visible failure

OpenAPI/JSON Schema can express required/optional/null, closed objects and a UTC-only timestamp pattern. Dropping that pattern is a generator limitation, not an OpenAPI limitation. A generic date-time format alone does not communicate the approved UTC-Z restriction. Native conversion retained it in the probe. Format annotations are not guaranteed to assert validity in every consumer; runtime Zod checks remain necessary.

JSON Schema validates instances; it does not describe the operational act of stripping extra fields. The server's closed response schema documents its actual emitted payload. Frontend readers may accept a future server's additional fields and project them away; generate/consume the strict output document for the server and maintain the tolerant runtime reader as a derived policy. Do not advertise a tolerant reader's accepted-input language as a closed JSON Schema. Native plain-object output conversion defaults to closed output, whereas input conversion differs; mode must be explicit.

Arbitrary predicates (for example account ownership, existence lookups, cross-record rules) cannot in general become JSON Schema assertions. Some refinements *could* be expressed declaratively: the probe's `refine(s => s === 'only')` could instead be `z.literal('only')`. Silent loss is unacceptable in either case. Recommend disallowing arbitrary wire-schema refinements by default; use supported native constraints wherever possible. Any necessary runtime-only semantics must be explicitly declared, documented without implying machine-enforced OpenAPI parity, and exercised through shared runtime validation/contract tests. This declaration is documentation of the same rule, not a second handwritten payload schema.

The recommended generation boundary needs a fail-closed allowlist/guard for schema/check kinds and metadata: reject transformations (including trim/normalization pipes), coercion, defaults/prefaults/catch fallbacks, JS-only values, unknown constructs and custom predicates lacking the explicit runtime-only declaration. Reject metadata/override escape hatches that overwrite generated type constraints; do not use `unrepresentable: any`. Native `unrepresentable: throw` is necessary but demonstrably insufficient. This guard is a proposed implementation requirement, not implemented or verified by this research. Neither tested lane satisfies all requirements out of the box; the evidence supports a human approach decision while acceptance of the eventual guard implementation remains pending. Inspecting internal schema definitions creates version-coupled maintenance; prefer restricted public construction helpers where practical and test every admitted check. A future generator upgrade must rerun the compatibility corpus.

## Evaluation handoff

First action: read the comparison and visible-failure findings above before choosing the generator approach in **Choose shared-schema and OpenAPI tooling**. Human evaluation remains pending; this report resolves only evidence gathering.

To reproduce, create a fresh temporary directory, install `zod@4.6.7 @asteasolutions/zod-to-openapi@9.1.0 @apidevtools/swagger-parser@12.1.0`, save the appendix as `probe.cjs` beside node_modules, replace `/tmp/taskflow-openapi-probe/` output paths with that directory, and run `node probe.cjs`. Review both generated documents and results.json feature by feature: catalog metadata; nested strictness; reader projection; missing/invalid values; null/omission; date/timestamp patterns; prohibited constructs; repeated bytes; validator success. Actual preflight: isolated install succeeded, script exited 0, nine check groups passed. No user acceptance, package selection, runtime guard completeness or production implementation is implied.

## Reproducible throwaway probe

```javascript
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {z}=require('zod');
const {OpenAPIRegistry,OpenApiGeneratorV31,extendZodWithOpenApi}=require('@asteasolutions/zod-to-openapi');
extendZodWithOpenApi(z);
const SwaggerParser=require('@apidevtools/swagger-parser');
const fields={id:z.string().min(1),dueDate:z.iso.date().nullable(),note:z.string().optional(),createdAt:z.iso.datetime({precision:3})};
const nestedFields={label:z.string()};
const Request=z.strictObject({title:z.string().min(1),detail:z.strictObject(nestedFields)});
const Response=z.strictObject({...fields,detail:z.strictObject(nestedFields)});
const Reader=z.object({...fields,detail:z.object(nestedFields)});
const catalog=[{method:'post',path:'/tasks/{id}',operationId:'createTask',security:[{bearerAuth:[]}],params:z.object({id:z.string()}),query:z.object({verbose:z.enum(['true','false']).optional()}),request:Request,responses:{201:{schema:Response,description:'Created'},400:{schema:z.strictObject({message:z.string()}),description:'Invalid request'}}}];
const config={openapi:'3.1.0',info:{title:'Throwaway compatibility',version:'0'},components:{securitySchemes:{bearerAuth:{type:'http',scheme:'bearer'}}}};
function builtin(){const schemas={}; const paths={};const register=(name,s,io)=>{schemas[name]=z.toJSONSchema(s,{target:'draft-2020-12',io,unrepresentable:'throw'});return {$ref:'#/components/schemas/'+name}};
for(const op of catalog){paths[op.path]={[op.method]:{operationId:op.operationId,security:op.security,parameters:[...Object.entries(op.params.shape).map(([name,s])=>({name,in:'path',required:true,schema:z.toJSONSchema(s)})),...Object.entries(op.query.shape).map(([name,s])=>({name,in:'query',required:!s.isOptional(),schema:z.toJSONSchema(s,{io:'input'})}))],requestBody:{required:true,content:{'application/json':{schema:register('Request',op.request,'input')}}},responses:Object.fromEntries(Object.entries(op.responses).map(([status,r])=>[status,{description:r.description,content:{'application/json':{schema:register('Response'+status,r.schema,'output')}}}]))}}}return {...config,components:{...config.components,schemas},paths}}
function purpose(){const registry=new OpenAPIRegistry();for(const op of catalog) registry.registerPath({method:op.method,path:op.path,operationId:op.operationId,security:op.security,request:{params:op.params,query:op.query,body:{required:true,content:{'application/json':{schema:registry.register('Request',op.request)}}}},responses:Object.fromEntries(Object.entries(op.responses).map(([status,r])=>[status,{description:r.description,content:{'application/json':{schema:registry.register('Response'+status,r.schema)}}}]))});return new OpenApiGeneratorV31(registry.definitions).generateDocument(config)}
const evidence={versions:{node:process.version,zod:require('zod/package.json').version,generator:require('@asteasolutions/zod-to-openapi/package.json').version},checks:[],probes:{}};
function check(name,fn){fn();evidence.checks.push(name)}
const good={id:'t',dueDate:null,createdAt:'2026-10-24T00:00:00.000Z',detail:{label:'x'}};
check('strict request rejects root and nested unknown fields',()=>{assert.equal(Request.safeParse({title:'x',detail:{label:'x'},extra:1}).success,false);assert.equal(Request.safeParse({title:'x',detail:{label:'x',extra:1}}).success,false)});
check('strict outgoing response rejects unknown fields; tolerant reader strips recursively',()=>{assert.equal(Response.safeParse({...good,extra:1}).success,false);assert.deepEqual(Reader.parse({...good,extra:1,detail:{label:'x',extra:1}}),good)});
check('tolerant reader still rejects missing and invalid declared fields',()=>{assert.equal(Reader.safeParse({dueDate:null,detail:{label:'x'}}).success,false);assert.equal(Reader.safeParse({...good,id:3}).success,false);assert.equal(Reader.safeParse({...good,detail:{label:3}}).success,false)});
(async()=>{for(const [name,generate]of Object.entries({builtin,purpose})){const doc=generate();fs.writeFileSync('/tmp/taskflow-openapi-probe/'+name+'.json',JSON.stringify(doc,null,2));check(name+' deterministic repeated fresh generation',()=>assert.equal(JSON.stringify(doc),JSON.stringify(generate())));const s=doc.components.schemas;check(name+' nested strictness, required/optional/null and references',()=>{assert.equal(s.Request.additionalProperties,false);assert.equal(s.Request.properties.detail.additionalProperties,false);assert(s.Response201.required.includes('dueDate'));assert(!s.Response201.required.includes('note'));assert.equal(s.Response201.additionalProperties,false);assert.equal(doc.paths['/tasks/{id}'].post.operationId,'createTask');assert.deepEqual(doc.paths['/tasks/{id}'].post.security,[{bearerAuth:[]}]);assert.equal(doc.paths['/tasks/{id}'].post.parameters.length,2);assert.deepEqual(Object.keys(doc.paths['/tasks/{id}'].post.responses),['201','400']);assert.equal(doc.paths['/tasks/{id}'].post.responses[201].content['application/json'].schema.$ref,'#/components/schemas/Response201')});await SwaggerParser.validate(JSON.parse(JSON.stringify(doc)));evidence.checks.push(name+' full OpenAPI 3.1 document validator passes');evidence.probes[name]={nullable:s.Response201.properties.dueDate};for(const [caseName,schema]of Object.entries({void:z.void(),timestamp:z.iso.datetime({precision:3}),date:z.date(),transform:z.string().transform(s=>s.length),refinement:z.string().refine(s=>s==='only'),regex:z.string().regex(/^only$/),coerce:z.coerce.number(),default:z.string().default('hidden')})){try{const result=name==='builtin'?z.toJSONSchema(schema,{unrepresentable:'throw'}):(()=>{const r=new OpenAPIRegistry();r.register('Probe',schema);return new OpenApiGeneratorV31(r.definitions).generateComponents()})();evidence.probes[name][caseName]={throws:false,result}}catch(e){evidence.probes[name][caseName]={throws:true,message:e.message}}}}
fs.writeFileSync('/tmp/taskflow-openapi-probe/results.json',JSON.stringify(evidence,null,2));console.log(JSON.stringify(evidence,null,2))})().catch(e=>{console.error(e);process.exitCode=1});

```

## Captured probe output

```json
{
  "versions": {
    "node": "v26.4.0",
    "zod": "4.6.7",
    "generator": "9.1.0"
  },
  "checks": [
    "strict request rejects root and nested unknown fields",
    "strict outgoing response rejects unknown fields; tolerant reader strips recursively",
    "tolerant reader still rejects missing and invalid declared fields",
    "builtin deterministic repeated fresh generation",
    "builtin nested strictness, required/optional/null and references",
    "builtin full OpenAPI 3.1 document validator passes",
    "purpose deterministic repeated fresh generation",
    "purpose nested strictness, required/optional/null and references",
    "purpose full OpenAPI 3.1 document validator passes"
  ],
  "probes": {
    "builtin": {
      "nullable": {
        "anyOf": [
          {
            "type": "string",
            "format": "date",
            "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$"
          },
          {
            "type": "null"
          }
        ]
      },
      "void": {
        "throws": true,
        "message": "Void cannot be represented in JSON Schema"
      },
      "timestamp": {
        "throws": false,
        "result": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "string",
          "format": "date-time",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d\\.\\d{3}(?:Z))$"
        }
      },
      "date": {
        "throws": true,
        "message": "Date cannot be represented in JSON Schema"
      },
      "transform": {
        "throws": true,
        "message": "Transforms cannot be represented in JSON Schema"
      },
      "refinement": {
        "throws": false,
        "result": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "string"
        }
      },
      "regex": {
        "throws": false,
        "result": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "string",
          "pattern": "^only$"
        }
      },
      "coerce": {
        "throws": false,
        "result": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "number"
        }
      },
      "default": {
        "throws": false,
        "result": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "default": "hidden",
          "type": "string"
        }
      }
    },
    "purpose": {
      "nullable": {
        "type": [
          "string",
          "null"
        ],
        "format": "date"
      },
      "void": {
        "throws": true,
        "message": "Unknown zod object type, please specify `type` and other OpenAPI props using `schema.openapi`."
      },
      "timestamp": {
        "throws": false,
        "result": {
          "components": {
            "schemas": {
              "Probe": {
                "type": "string",
                "format": "date-time"
              }
            },
            "parameters": {}
          }
        }
      },
      "date": {
        "throws": false,
        "result": {
          "components": {
            "schemas": {
              "Probe": {
                "type": "string",
                "format": "date-time"
              }
            },
            "parameters": {}
          }
        }
      },
      "transform": {
        "throws": false,
        "result": {
          "components": {
            "schemas": {
              "Probe": {
                "type": "string"
              }
            },
            "parameters": {}
          }
        }
      },
      "refinement": {
        "throws": false,
        "result": {
          "components": {
            "schemas": {
              "Probe": {
                "type": "string"
              }
            },
            "parameters": {}
          }
        }
      },
      "regex": {
        "throws": false,
        "result": {
          "components": {
            "schemas": {
              "Probe": {
                "type": "string",
                "pattern": "^only$"
              }
            },
            "parameters": {}
          }
        }
      },
      "coerce": {
        "throws": false,
        "result": {
          "components": {
            "schemas": {
              "Probe": {
                "type": [
                  "number",
                  "null"
                ]
              }
            },
            "parameters": {}
          }
        }
      },
      "default": {
        "throws": false,
        "result": {
          "components": {
            "schemas": {
              "Probe": {
                "type": "string",
                "default": "hidden"
              }
            },
            "parameters": {}
          }
        }
      }
    }
  }
}

```
