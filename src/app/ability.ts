import { AbilityBuilder, Ability } from "@casl/ability";

export function defineAbilitiesFor(role) {
  const { can, rules } = AbilityBuilder.extract();

  if (role === "admin") {
    var permArr = ["create", "alerts"];
    can("manage", permArr);
  } else {
    can("manage", "alerts", { assignee: "me" });
  }
  var permits = JSON.parse(localStorage.getItem("permits"));
  // var permits = JSON.parse(
  //   '{"bike":false,"dart":false,"luas":true,"bus":false,"traffic":true,"pollution":true}'
  // );
  if (permits) {
    const keys = Object.keys(permits);
    var permissions = [];
    for (var i = 0; i < keys.length; i++) {
      if (permits[keys[i]] == true) {
        permissions.push(keys[i]);
      }
    }
    can("read", permissions);
  }
  return rules;
}

export function createAbility() {
  return new Ability(defineAbilitiesFor("member"), {
    subjectName(subject) {
      if (!subject || typeof subject === "string") {
        return subject;
      }

      return subject.__typename;
    }
  });
}
