{ pkgs }:
pkgs.buildEnv {
  name = "oswegopark-labs-env";
  paths = with pkgs; [
    nodejs_18
    nodePackages.npm
    nodePackages.typescript
    nodePackages.typescript-language-server
  ];
}