import {
  ProtoMessage,
  ProtoField,
  ProtoPrimitive,
  ProtoType,
} from './models/models_pb'

export function parseProtoField(
  obj: unknown,
  fieldName: string,
  fieldTag: number,
): ProtoField {
  const protoField = new ProtoField()
  protoField.setName(fieldName)
  protoField.setTag(fieldTag)

  switch (typeof obj) {
    case 'string': {
      const protoType = new ProtoType()
      protoType.setProtoTypePrimitive(ProtoPrimitive.PROTO_PRIMITIVE_STRING)

      protoField.setType(protoType)
    }
  }

  return protoField
}

export function parseRootObjectToProtoMessage(
  obj: object,
  name = 'root',
): ProtoMessage {
  const root = new ProtoMessage()

  root.setName(name)

  Object.keys(obj).forEach((key, idx) => {
    root.addFields(parseProtoField((obj as any)[key], key, idx + 1))
  })

  return root
}
